import { useEffect, useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, Tag, Space, Input } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { IUser } from "../../../../types/TypeUser";
import { GetListUser, CreateUser, UpdateUser, DeleteUser } from "../../../../service/Api/User/UserAPI";
import { AddNewUser, EditUser } from "./Model";
import { message, Popconfirm } from "antd";

const UserManager = () => {
  const actionRef = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [dataUser, setDataUser] = useState<IUser[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const fetchData = async () => {
    try {
      let data = await GetListUser();
      if (data && data.code === 1000 && data.result) {
        setDataUser(data.result);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAddSubmit = async (data: Partial<IUser>) => {
    try {
      const res = await CreateUser(data);
      if (res && res.code === 1000) {
        await fetchData();
        setAddModalVisible(false);
        message.success("Thêm người dùng thành công");
      } else {
        message.error(res.message || "Thêm người dùng thất bại");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm người dùng");
    }
  };

  const handleEditSubmit = async (data: Partial<IUser>) => {
    if (!selectedUser) return;
    try {
      const res = await UpdateUser(selectedUser.id, data);
      if (res && res.code === 1000) {
        await fetchData();
        setEditModalVisible(false);
        setSelectedUser(null);
        message.success("Cập nhật người dùng thành công");
      } else {
        message.error(res.message || "Cập nhật người dùng thất bại");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật người dùng");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteUser(id);
      if (res && res.code === 1000) {
        message.success("Xóa người dùng thành công");
        await fetchData();
      } else {
        message.error(res.message || "Xóa người dùng thất bại");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa");
    }
  };

  const handleEditClick = (record: IUser) => {
    setSelectedUser(record);
    setEditModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, [])
  const columns = [
    {
      title: "Người dùng",
      dataIndex: "fullName",
      width: 220,
      render: (text: string) => (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 240,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: 140,
      render: (role: string) => {
        const roleMap: any = {
          ADMIN: { color: "blue", label: "Quản trị viên" },
          RECRUITER: { color: "orange", label: "Nhà tuyển dụng" },
          CANDIDATE: { color: "green", label: "Ứng viên" },
        };
        const config = roleMap[role] || { color: "default", label: role };
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 140,
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "Hoạt động" : "Bị khóa"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      width: 180,
    },
    {
      title: "Thao tác",
      width: 180,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEditClick(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa người dùng này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
          Quản lý người dùng
        </h2>
        <p style={{ marginTop: 6, color: "#666" }}>
          Quản lý tài khoản, phân quyền và trạng thái hệ thống
        </p>
      </div>

      <Input
        placeholder="Tìm theo tên hoặc email..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ width: 400, marginBottom: 16 }}
      />

      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns as any}
        dataSource={dataUser}
        search={false}
        headerTitle="Danh sách người dùng"
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
            Thêm người dùng
          </Button>,
        ]}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        options={{
          reload: false,
          density: true,
          fullScreen: true,
          setting: true,
        }}
        scroll={{ x: 1000 }}
      />

      <AddNewUser
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddSubmit}
      />

      <EditUser
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEditSubmit}
        initialData={selectedUser || undefined}
      />
    </div>
  );
};

export default UserManager;
