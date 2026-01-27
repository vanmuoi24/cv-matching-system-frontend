import React, { useState, type ReactNode } from "react";
import {
  Card,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Statistic,
  Progress,
  Typography,
} from "antd";
import { ProTable } from "@ant-design/pro-components";
import {
  RobotOutlined,
  FilePdfOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const JobCvAIFilter = () => {
  const [loading, setLoading] = useState(false);
  const [cvList, setCvList] = useState<any[]>([]);
  const [stats, setStats] = useState({
    excellent: 0,
    good: 0,
    reject: 0,
  });

  const handleAIFilter = () => {
    setLoading(true);

    setTimeout(() => {
      const cvs = [
        {
          id: 1,
          name: "Nguyễn Văn A",
          score: 92,
          exp: "3 năm",
          reason: "Kinh nghiệm React mạnh, đúng JD",
        },
        {
          id: 2,
          name: "Trần Thị B",
          score: 85,
          exp: "2.5 năm",
          reason: "Đủ kỹ năng, thiếu 1 số tool nâng cao",
        },
        {
          id: 3,
          name: "Lê Văn C",
          score: 68,
          exp: "1 năm",
          reason: "Kinh nghiệm chưa phù hợp",
        },
      ];

      const excellent = cvs.filter((c) => c.score >= 85);
      const good = cvs.filter((c) => c.score >= 70 && c.score < 85);
      const reject = cvs.filter((c) => c.score < 70);

      setCvList([...excellent, ...good]);
      setStats({
        excellent: excellent.length,
        good: good.length,
        reject: reject.length,
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ padding: 24, background: "#f5f7fb", minHeight: "100vh" }}>
      {/* ================= JOB INFO ================= */}
      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={6}>
          <Text strong style={{ fontSize: 22 }}>
            Frontend Developer (ReactJS)
          </Text>
          <Space>
            <Tag color="blue">SmartCV</Tag>
            <Tag color="green">10,248 CV</Tag>
          </Space>
        </Space>
      </Card>

      {/* ================= AI ACTION ================= */}
      <Card style={{ marginBottom: 16 }}>
        <Space>
          <Button
            type="primary"
            size="large"
            icon={<RobotOutlined />}
            loading={loading}
            onClick={handleAIFilter}
            style={{
              background: "linear-gradient(135deg,#1677ff,#69b1ff)",
              border: "none",
            }}
          >
            AI lọc CV cho Job này
          </Button>
          <Text type="secondary">
            AI phân tích CV, chấm điểm & đề xuất ứng viên phù hợp nhất
          </Text>
        </Space>
      </Card>

      {/* ================= AI STATS ================= */}
      {cvList.length > 0 && (
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Rất phù hợp"
                value={stats.excellent}
                prefix={<TrophyOutlined style={{ color: "#52c41a" }} />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Phù hợp"
                value={stats.good}
                prefix={<CheckCircleOutlined style={{ color: "#faad14" }} />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Không phù hợp"
                value={stats.reject}
                prefix={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* ================= TABLE ================= */}
      <Card>
        <ProTable
          rowKey="id"
          search={false}
          loading={loading}
          dataSource={cvList}
          pagination={{ pageSize: 5 }}
          headerTitle="CV được AI đề xuất"
          columns={[
            {
              title: "Ứng viên",
              dataIndex: "name",
              render: (_: ReactNode, entity: any) => (
                <Text strong>{entity.name}</Text>
              ),
            },
            {
              title: "Kinh nghiệm",
              dataIndex: "exp",
              width: 140,
            },
            {
              title: "AI Score",
              dataIndex: "score",
              width: 220,
              render: (_: ReactNode, entity: any) => {
                const color =
                  entity.score >= 85
                    ? "green"
                    : entity.score >= 70
                    ? "orange"
                    : "red";

                const label =
                  entity.score >= 85
                    ? "Rất phù hợp"
                    : entity.score >= 70
                    ? "Phù hợp"
                    : "Không phù hợp";

                return (
                  <Space direction="vertical" size={4}>
                    <Progress
                      percent={entity.score}
                      size="small"
                      strokeColor={color}
                    />
                    <Tag color={color}>{label}</Tag>
                  </Space>
                );
              },
            },
            {
              title: "Nhận xét AI",
              dataIndex: "reason",
              ellipsis: true,
            },
            {
              title: "CV",
              width: 120,
              render: () => (
                <Button
                  type="link"
                  icon={<FilePdfOutlined />}
                >
                  Xem CV
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default JobCvAIFilter;
