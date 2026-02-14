import React, { useRef, useState } from "react";
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

const JobPostingManagement = () => {
  const actionRef = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [openResume, setOpenResume] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);

  // 🔹 DATA GIẢ
  const dataSource = [
    {
      id: 1,
      title: "Frontend Developer (ReactJS)",
      company: "SmartCV",
      salary: "15 - 20 triệu",
      status: "OPEN",
      createdAt: "24/01/2026",
      cvCount: 12,
    },
    {
      id: 2,
      title: "Backend Developer (Java)",
      company: "Tech Corp",
      salary: "18 - 25 triệu",
      status: "PAUSE",
      createdAt: "20/01/2026",
      cvCount: 5,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      salary: "12 - 18 triệu",
      status: "CLOSED",
      createdAt: "15/01/2026",
      cvCount: 0,
    },
  ];

  const columns = [
    {
      title: "Vị trí tuyển dụng",
      dataIndex: "title",
      width: 280,
      render: (_: any, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.title}</div>
          <div style={{ color: "#888", fontSize: 13 }}>
            {record.company} • {record.salary}
          </div>
        </div>
      ),
    },
    {
      title: "Số CV",
      dataIndex: "cvCount",
      width: 120,
      align: "center",
      render: (cvCount: number) => (
        <Badge
          count={cvCount}
          showZero
          style={{
            backgroundColor: cvCount > 0 ? "#52c41a" : "#d9d9d9",
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
      dataIndex: "createdAt",
      width: 140,
      align: "center",
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
            disabled={record.cvCount === 0}
            onClick={() => setOpenResume(true)}
          >
            CV ({record.cvCount})
          </Button>
          <Button type="link" icon={<EyeOutlined />}>
            Xem
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick(record)}>
            Sửa
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddSubmit = async (data: Partial<IJob>) => {
    // TODO: Implement your API call to add the job
    setAddModalVisible(false);
  };

  const handleEditSubmit = async (data: Partial<IJob>) => {
    // TODO: Implement your API call to update the job
    setEditModalVisible(false);
    setSelectedJob(null);
  };

  const handleEditClick = (record: IJob) => {
    setSelectedJob(record);
    setEditModalVisible(true);
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
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
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
/>

      <AddNewJob
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddSubmit}
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
    </div>
  );
};

export default JobPostingManagement;
