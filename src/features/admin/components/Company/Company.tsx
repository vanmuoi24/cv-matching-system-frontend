import React, { use, useEffect, useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, Tag, Space, Input, Avatar } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BankOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { GetListCompany } from "../../../../service/Api/Company/Company";
import type { ICompany } from "../../../../types/TypeCompany";
import AddNewCompany from "./Model/AddNewCompany";
import EditCompany from "./Model/EditCompany";


const Company = () => {
  const actionRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [dataCompany, setDataCompany] = useState<ICompany[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);

  const fechdataCompany = async () => {
    let res = await GetListCompany();
    if (res && res.code === 1000 && res.result) {
      setDataCompany(res.result);
    }
  };

  const handleAddSubmit = async (data: Partial<ICompany>) => {
    // TODO: Implement your API call to add the company
    await fechdataCompany();
    setAddModalVisible(false);
  };

  const handleEditSubmit = async (data: Partial<ICompany>) => {
    // TODO: Implement your API call to update the company
    await fechdataCompany();
    setEditModalVisible(false);
    setSelectedCompany(null);
  };

  const handleEditClick = (record: ICompany) => {
    setSelectedCompany(record);
    setEditModalVisible(true);
  };

  useEffect(() => {
    fechdataCompany();
  }, []);

  const columns = [
    {
      title: "Công ty",
      dataIndex: "name",
      width: 260,
      render: (_: any, record: any) => (
        <Space>
          <Avatar src={record.logo_url} icon={<BankOutlined />} />
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            <a
              href={record.website}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 12 }}
            >
              {record.website}
            </a>
          </div>
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 280,
      ellipsis: true,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 140,
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "Hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      width: 160,
    },
    {
      title: "Thao tác",
      width: 160,
      fixed: "right",
      render: (_: any, record: any) => (
        <Space size="small">
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

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
          🏢 Quản lý công ty
        </h2>
        <p style={{ marginTop: 6, color: "#666" }}>
          Quản lý danh sách và thông tin các công ty trong hệ thống
        </p>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Tìm theo tên công ty hoặc website..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ width: 420, marginBottom: 16 }}
      />

      {/* TABLE */}
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns as any}
        dataSource={dataCompany.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.website
              .toLowerCase()
              .includes(searchText.toLowerCase())
        )}
        search={false}
        headerTitle="Danh sách công ty"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModalVisible(true)}
          >
            Thêm công ty
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
        scroll={{ x: 1200 }}
      />

      <AddNewCompany
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddSubmit}
      />

      <EditCompany
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedCompany(null);
        }}
        onSubmit={handleEditSubmit}
        initialData={selectedCompany || undefined}
      />
    </div>
  );
};

export default Company;
