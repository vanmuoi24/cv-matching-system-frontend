import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { Button, Tag, Space, Statistic, Typography } from "antd";
import {
  RobotOutlined,
  ApartmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { IJob } from "../../../../types/TypeJob";
import { GetListJob } from "../../../../service/Api/Job/Job";


const { Text } = Typography;

const JobListForAI = () => {
  const navigate = useNavigate();
  const actionRef = useRef<any>(null);

  const [dataJob, setDataJob] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDataJob = async () => {
    try {
      setLoading(true);
      const res = await GetListJob();

      if (res && res.code === 1000 && res.result) {
        setDataJob(res.result); 
      }
    } catch (error) {
      console.error("Fetch job error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataJob();
  }, []);

  const columns: ProColumns<IJob>[] = [
    {
      title: "Vị trí tuyển dụng",
      dataIndex: "title",
      width: 360,
      render: (_, record) => (
        <Space direction="vertical" size={6}>
          <Text strong style={{ fontSize: 14 }}>
            {record.title}
          </Text>
          <Space size={6}>
            <ApartmentOutlined style={{ color: "#999" }} />
            <Text type="secondary">{record.company?.name}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "CV đã nộp",
      dataIndex: "applicationList",
      width: 200,
      render: (vapplicationList: any) => (
        <Space>
          <FileTextOutlined style={{ color: "#1677ff" }} />
          <Statistic value={vapplicationList.length || 0} suffix="CV" valueStyle={{ fontSize: 18 }} />
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 160,
      render: (v) => (
        <Tag color={v === "OPEN" ? "green" : "red"} style={{ padding: "4px 10px" }}>
          {v === "OPEN" ? "Đang tuyển" : "Đã đóng"}
        </Tag>
      ),
    },
    {
      title: "AI Screening",
      width: 240,
      render: (_, record) => (
        <Button
          type="primary"
          size="middle"
          icon={<RobotOutlined />}
          style={{
            background: "linear-gradient(135deg, #1677ff, #69b1ff)",
            border: "none",
            fontWeight: 500,
          }}
          onClick={() => navigate(`/admin/ai/${record.id}`)}
        >
          Lọc CV bằng AI
        </Button>
      ),
    },
  ];

  return (
    <ProTable<IJob>
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      dataSource={dataJob}
      loading={loading}
      search={false}
      headerTitle={
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 22, fontWeight: 600 }}>
            AI CV Screening
          </Text>
          <Text type="secondary">
            Chọn job để AI tự động chấm điểm & lọc CV phù hợp
          </Text>
        </Space>
      }
      toolBarRender={() => [
        <Button
          key="refresh"
          onClick={fetchDataJob}
          loading={loading}
        >
          Tải lại danh sách
        </Button>,
      ]}
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      options={{
        reload: true,
        density: true,
        fullScreen: true,
        setting: true,
      }}
      scroll={{ x: 1100 }}
      cardBordered
      bordered={false}
    />
  );
};

export default JobListForAI;
