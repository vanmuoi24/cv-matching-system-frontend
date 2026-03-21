import React, { useEffect, useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, Tag, Space, Input, Badge } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { IJob } from "../../../../types/TypeJob";
import { AddNewJob, EditJob } from "./Model";
import ListResume from "./Resume/ListResume";
import {
  AddJob,
  DeleteJob,
  GetListJob,
  UpdateJob,
} from "../../../../service/Api/Job/Job";
// import { CloudSnowIcon } from "lucide-react";
import type { ICompany } from "../../../../types/TypeCompany";
import { GetListCompany } from "../../../../service/Api/Company/Company";
import ViewJob from "./Model/ViewJob";
import { toast } from "react-toastify";

const JobPostingManagement = () => {
  const actionRef = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [openResume, setOpenResume] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [dataSource, setDataSource] = useState<IJob[]>([]);
  const [companiesList, setCompaniesList] = useState<ICompany[]>([]);
  useEffect(() => {
    const fetchDataJob = async () => {
      const res = await GetListJob();
      if (res?.code === 1000 && res.result) {
        setDataSource(res.result);
      }
      const res1 = await GetListCompany();
      if (res1?.code === 1000 && res1.result) {
        setCompaniesList(res1.result);
      }
    };

    fetchDataJob();
  }, []);
  // 🔹 DATA GIẢ
  // const dataSource = [
  //   {
  //     id: 1,
  //     title: "Frontend Developer (ReactJS)",
  //     company: "SmartCV",
  //     salary: "15 - 20 triệu",
  //     status: "OPEN",
  //     createdAt: "24/01/2026",
  //     cvCount: 12,
  //   },
  //   {
  //     id: 2,
  //     title: "Backend Developer (Java)",
  //     company: "Tech Corp",
  //     salary: "18 - 25 triệu",
  //     status: "PAUSE",
  //     createdAt: "20/01/2026",
  //     cvCount: 5,
  //   },
  //   {
  //     id: 3,
  //     title: "UI/UX Designer",
  //     company: "Design Studio",
  //     salary: "12 - 18 triệu",
  //     status: "CLOSED",
  //     createdAt: "15/01/2026",
  //     cvCount: 0,
  //   },
  // ];

  const columns = [
    {
      title: "Vị trí tuyển dụng",
      dataIndex: "title",
      width: 280,
      render: (_: any, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.title}</div>
          <div style={{ color: "#888", fontSize: 13 }}>
            {record.company.name} • {record.salary}
          </div>
        </div>
      ),
    },

    {
      title: "Số CV",
      dataIndex: "cvCount",
      width: 120,
      align: "center",
      render: (_: any, record: any) => (
        <Badge
          count={record.applicationList.length}
          showZero
          style={{
            backgroundColor:
              record.applicationList.length > 0 ? "#52c41a" : "#d9d9d9",
          }}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 140,
      align: "center",
      render: (status: string) => {
        const map: any = {
          OPEN: { color: "green", label: "Đang tuyển" },
          PAUSE: { color: "orange", label: "Tạm dừng" },
          CLOSED: { color: "red", label: "Đã đóng" },
        };
        return <Tag color={map[status].color}>{map[status].label}</Tag>;
      },
    },
    {
      title: "Ngày đăng",
      dataIndex: "createAt",
      width: 140,
      align: "center",
      render: (createAt: string) => {
        const date = new Date(createAt);
        return date.toLocaleDateString("vi-VN");
      },
    },
    {
      title: "Thao tác",
      width: 260,
      align: "center",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            icon={<FileTextOutlined />}
            disabled={record.applicationList.length === 0}
            onClick={() => handleViewResume(record)}
          >
            CV ({record.applicationList.length})
          </Button>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewClick(record)}
          >
            Xem
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          >
            Sửa
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddSubmit = async (data: Partial<IJob>) => {
    // TODO: Implement your API call to add the job
    const res = await AddJob(data);
    if (res?.code === 1000 && res.result) {
      const newList = await GetListJob();
      setDataSource(newList.result);
      toast.success("Tạo tin tuyển dụng thành công");
    } else {
      toast.error("Tạo tin tuyển dụng thất bại");
    }
    setAddModalVisible(false);
  };

  const handleEditSubmit = async (data: Partial<IJob>) => {
    // TODO: Implement your API call to update the job
    const res = await UpdateJob(selectedJob?.id, data);

    if (res?.code === 1000) {
      const newList = await GetListJob();
      setDataSource(newList.result);
      toast.success("Cập nhật tin tuyển dụng thành công");
    } else {
      toast.error("Cập nhật tin tuyển dụng thất bại");
    }
    setEditModalVisible(false);
    setSelectedJob(null);
  };

  const handleDelete = async (data: IJob) => {
    const ok = window.confirm("Bạn có chắc muốn xóa không?");
    if (!ok) return;

    const res = await DeleteJob(data.id);
    if (res.code === 1000) {
      toast.success("Xóa tin tuyển dụng thành công");
      const newList = await GetListJob();
      setDataSource(newList.result);
    } else {
      toast.error("Xóa tin tuyển dụng thất bại");
    }
  };
  const handleEditClick = (record: IJob) => {
    setSelectedJob(record);
    setEditModalVisible(true);
  };

  const handleViewClick = (record: IJob) => {
    setSelectedJob(record);
    setViewModalVisible(true);
  };

  const handleViewResume = (record: IJob) => {
    setSelectedJob(record);
    setOpenResume(true);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
          Quản lý tin tuyển dụng
        </h2>
        <p style={{ marginTop: 6, color: "#666" }}>
          Theo dõi bài đăng và số lượng CV ứng tuyển
        </p>
      </div>

      {/* Search */}
      <Input
        placeholder="Tìm theo vị trí hoặc công ty..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ width: 420, marginBottom: 16 }}
      />

      {/* Table */}
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns as any}
        dataSource={dataSource}
        search={false}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModalVisible(true)}
          >
            Đăng tin tuyển dụng
          </Button>,
        ]}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
        }}
        options={{
          reload: false,
          density: true,
          fullScreen: true,
          setting: true,
        }}
        scroll={{ x: 1200 }}
      />

      <ListResume
        open={openResume}
        onClose={() => setOpenResume(false)}
        listResume={selectedJob?.applicationList}
      />
      <AddNewJob
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddSubmit}
        companies={companiesList}
      />

      <EditJob
        open={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedJob(null);
        }}
        onSubmit={handleEditSubmit}
        initialData={selectedJob || undefined}
      />
      <ViewJob
        open={viewModalVisible}
        onClose={() => {
          setViewModalVisible(false);
          setSelectedJob(null);
        }}
        initialData={selectedJob || undefined}
      />
    </div>
  );
};

export default JobPostingManagement;
