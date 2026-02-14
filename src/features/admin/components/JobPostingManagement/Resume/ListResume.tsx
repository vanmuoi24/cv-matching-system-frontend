import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Table, Tag, Button, Space, Avatar, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FilePdfOutlined,
  EyeOutlined,
  DownloadOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

type Resume = {
  id: number;
  candidateName: string;
  email: string;
  status: "NEW" | "VIEWED" | "PASSED" | "REJECTED";
  pdfUrl: string;
};
interface ListResumeProps {
  open: boolean;
  onClose: () => void;
}
const ListResume: React.FC<ListResumeProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const data: Resume[] = [
    {
      id: 1,
      candidateName: "Nguyễn Văn A",
      email: "a.nguyen@gmail.com",
      status: "NEW",
      pdfUrl: "https://console.cloudinary.com/app/c-e9b4853ecf1141d3ea69964c9d0585/assets/media_library/search/asset/8efd32a671410857e92ffa4989168a06/manage/summary?q=&view_mode=mosaic&context=manage",
    },
    {
      id: 2,
      candidateName: "Trần Thị B",
      email: "b.tran@gmail.com",
      status: "VIEWED",
      pdfUrl: "/cv/b.pdf",
    },
  ];

  const columns: ColumnsType<Resume> = [
    {
      title: "Ứng viên",
      render: (_, r) => (
        <Space>
          <Avatar size={36} icon={<UserOutlined />} />
          <div>
            <Text strong>{r.candidateName}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {r.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 120,
      align: "center",
      render: (s) => (
        <Tag
          color={
            s === "NEW"
              ? "blue"
              : s === "VIEWED"
                ? "gold"
                : s === "PASSED"
                  ? "green"
                  : "red"
          }
        >
          {s}
        </Tag>
      ),
    },
    {
      title: "CV",
      width: 120,
      align: "center",
      render: (_, r) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/cv/${r.id}`, { state: { pdfUrl: r.pdfUrl } })}
          />
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={() => window.open(r.pdfUrl)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      title={
        <Space>
          <FilePdfOutlined />
          CV ứng tuyển
        </Space>
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
      />
    </Modal>
  );
};

export default ListResume;
