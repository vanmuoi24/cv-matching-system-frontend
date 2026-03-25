import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Table,
  Tag,
  Button,
  Space,
  Avatar,
  Typography,
  Input,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FilePdfOutlined,
  EyeOutlined,
  DownloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { IApplication } from "../../../../../types/TypeApplication";
import { UpdateApplication } from "@/service/Api/Application/Application";
import { toast } from "react-toastify";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

type Resume = {
  id: number;
  candidateName: string;
  email: string;
  status: string;
  pdfUrl: string;
};

interface ListResumeProps {
  open: boolean;
  onClose: () => void;
  listResume?: IApplication[];
}

const ListResume: React.FC<ListResumeProps> = ({
  open,
  onClose,
  listResume,
}) => {
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [rejectModal, setRejectModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  // ================= MAP DATA =================
  const data: Resume[] =
    listResume?.map((app) => ({
      id: app.id,
      candidateName: app?.candidate?.fullName ?? "Chưa cập nhật",
      email: app?.candidate?.email ?? "Chưa cập nhật",
      status: app.status?.trim().toUpperCase() ?? "PENDING",
      pdfUrl: app?.candidate?.profile?.cvFileUrl ?? "",
    })) ?? [];

  // ================= FILTER DATA =================
  const filteredData = useMemo(() => {
    if (filterStatus === "ALL") return data;
    return data.filter((item) => item.status === filterStatus);
  }, [data, filterStatus]);

  // ================= APPROVE =================
  const handleApprove = async (application: IApplication) => {
    try {
      setLoadingId(application.id);

      // CALL API APPROVE
      // await axios.put(`/api/application/${id}/approve`);
      application.status = "HIRED";
      const res = await UpdateApplication(application.id, application);
      if (res.code === 1000 && res.result) {
        toast.success("Đã phê duyệt ứng viên");
        listResume?.forEach((app) => {
          if (app.id === application.id) {
            app.status = "HIRED";
          }
        });
      }
    } catch {
      toast.error("Xử lý thất bại");
    } finally {
      setLoadingId(null);
    }
  };

  // ================= REJECT =================
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối");
      return;
    }

    try {
      if (!selectedId) return;

      setLoadingId(selectedId);

      // CALL API REJECT
      // await axios.put(`/api/application/${selectedId}/reject`, {
      //   reason: rejectReason,
      // });

      const res = await UpdateApplication(selectedId, { status: "REJECTED" });
      if (res.code === 1000 && res.result) {
        toast.success("Đã từ chối ứng viên");
        setRejectModal(false);
        setRejectReason("");
        listResume?.forEach((app) => {
          if (app.id === selectedId) {
            app.status = "REJECTED";
          }
        });
      }
    } catch {
      toast.error("Xử lý thất bại");
    } finally {
      setLoadingId(null);
    }
  };

  // ================= TABLE =================
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
      align: "center",
      render: (status) => {
        const color =
          status === "PENDING"
            ? "blue"
            : status === "APPROVED"
              ? "green"
              : "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "CV",
      align: "center",
      render: (_, r) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            // onClick={() =>
            //   navigate(`/admin/cv/${r.id}`, { state: { pdfUrl: r.pdfUrl } })
            // }
            onClick={() => window.open(r.pdfUrl, "_blank")}
          />
          <Button
            type="text"
            icon={<DownloadOutlined />}
            // onClick={() => window.open(r.pdfUrl)}
            onClick={async () => {
              const res = await fetch(r.pdfUrl);
              const blob = await res.blob();

              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");

              link.href = url;
              link.download = "cv.pdf";
              link.click();

              window.URL.revokeObjectURL(url);
            }}
          />
        </Space>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, r) =>
        r.status === "PENDING" ? (
          <Space>
            <Button
              type="primary"
              loading={loadingId === r.id}
              onClick={() => handleApprove(r)}
            >
              Phê duyệt
            </Button>

            <Button
              danger
              loading={loadingId === r.id}
              onClick={() => {
                setSelectedId(r.id);
                setRejectModal(true);
              }}
            >
              Từ chối
            </Button>
          </Space>
        ) : (
          <Text type="secondary">Đã xử lý</Text>
        ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        width={1100}
        title={
          <Space>
            <FilePdfOutlined />
            Quản lý CV ứng tuyển
          </Space>
        }
      >
        {/* FILTER */}
        <div style={{ marginBottom: 16 }}>
          <Select
            value={filterStatus}
            style={{ width: 220 }}
            onChange={setFilterStatus}
          >
            <Option value="ALL">Tất cả</Option>
            <Option value="PENDING">Chờ xử lý</Option>
            <Option value="APPROVED">Đã phê duyệt</Option>
            <Option value="REJECTED">Đã từ chối</Option>
          </Select>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
      </Modal>

      {/* REJECT MODAL */}
      <Modal
        open={rejectModal}
        onCancel={() => setRejectModal(false)}
        onOk={handleReject}
        okText="Xác nhận từ chối"
        cancelText="Huỷ"
        confirmLoading={loadingId !== null}
        title="Nhập lý do từ chối"
      >
        <TextArea
          rows={4}
          placeholder="Nhập lý do gửi cho ứng viên..."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ListResume;
