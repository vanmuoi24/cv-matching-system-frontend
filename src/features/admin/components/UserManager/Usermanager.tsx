import React, { useEffect, useRef, useState } from "react";
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
import { GetListUser } from "../../../../service/Api/User/UserAPI";

const UserManager = () => {
  const actionRef = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
const [dataUser, setDataUser] = useState<IUser[]>([]);
  const fetchData = async () => {
    try {
      let data = await GetListUser();
      if(data && data.code === 1000 && data.result){
        setDataUser(data.result);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(()=>{
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
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "blue" : "default"}>
          {role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
        </Tag>
      ),
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
      render: () => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} size="small">
            Sửa
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
          Quản lý người dùng
        </h2>
        <p style={{ marginTop: 6, color: "#666" }}>
          Quản lý tài khoản, phân quyền và trạng thái hệ thống
        </p>
      </div>

      {/* Search UI (chỉ giao diện) */}
      <Input
        placeholder="Tìm theo tên hoặc email..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ width: 400, marginBottom: 16 }}
      />

      {/* Table */}
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns as any}
        dataSource={dataUser}
        search={false}
        headerTitle="Danh sách người dùng"
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />}>
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
    </div>
  );
};

export default UserManager;
