import { ProTable } from "@ant-design/pro-components";
import { Button, Tag, Space, Statistic, Typography } from "antd";
import {
  RobotOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const { Text } = Typography;

const JobListForAI = () => {
  const navigate = useNavigate();
  const actionRef = useRef<any>(null);

  const dataSource = [
    {
      id: 1,
      title: "Frontend Developer (ReactJS)",
      company: "SmartCV",
      totalCv: 10248,
      status: "OPEN",
    },
    {
      id: 2,
      title: "Backend Developer (Java)",
      company: "Tech Corp",
      totalCv: 5321,
      status: "OPEN",
    },
  ];

  const columns = [
    {
      title: "Vị trí tuyển dụng",
      dataIndex: "title",
      width: 360,
      render: (_: any, record: any) => (
        <Space direction="vertical" size={6}>
          <Text strong style={{ fontSize: 14 }}>
            {record.title}
          </Text>
          <Space size={6}>
            <ApartmentOutlined style={{ color: "#999" }} />
            <Text type="secondary">{record.company}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "CV đã nộp",
      dataIndex: "totalCv",
      width: 200,
      render: (v: number) => (
        <Space>
          <FileTextOutlined style={{ color: "#1677ff" }} />
          <Statistic
            value={v}
            suffix="CV"
            valueStyle={{ fontSize: 18 }}
          />
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 160,
      render: () => (
        <Tag color="green" style={{ padding: "4px 10px" }}>
          Đang tuyển
        </Tag>
      ),
    },
    {
      title: "AI Screening",
      width: 240,
      render: (_: any, record: any) => (
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
    <ProTable
      actionRef={actionRef}
      rowKey="id"
      columns={columns as any}
      dataSource={dataSource}
      search={false}
      headerTitle={
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 22, fontWeight: 300 }}>
            🤖 AI CV Screening
          </Text>
          <Text type="secondary">
            Chọn job để AI tự động chấm điểm & lọc CV phù hợp
          </Text>
        </Space>
      }
 
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
      scroll={{ x: 1100 }}
      cardBordered
      bordered={false}
    />
  );
};

export default JobListForAI;
