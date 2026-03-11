import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  Slider,
  InputNumber,
  Divider,
  Drawer,
  Descriptions,
  Empty,
  Segmented,
} from "antd";
import { ProTable } from "@ant-design/pro-components";
import {
  RobotOutlined,
  FilePdfOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import type { IJob } from "../../../../types/TypeJob";
import type { IApplication } from "../../../../types/TypeApplication";
import { JobApiById } from "../../../../service/Api/Job/Job";

const { Text } = Typography;

type ScoreBucket = "excellent" | "good" | "reject";

type ApplicationRow = {
  id: number;
  appliedAt?: string;
  status?: string;
  candidateName: string;
  candidateEmail?: string;
  score: number; // 0..100
  bucket: ScoreBucket;
  reason: string;
  raw: IApplication;
};

function normalizeScore(v: unknown): number | null {
  if (typeof v !== "number" || Number.isNaN(v)) return null;
  // backend might return 0..1 or 0..100
  if (v <= 1) return Math.round(v * 100);
  return Math.round(Math.max(0, Math.min(100, v)));
}

function bucketForScore(score: number, thresholdExcellent: number, thresholdGood: number): ScoreBucket {
  if (score >= thresholdExcellent) return "excellent";
  if (score >= thresholdGood) return "good";
  return "reject";
}

function colorForBucket(bucket: ScoreBucket): "green" | "orange" | "red" {
  if (bucket === "excellent") return "green";
  if (bucket === "good") return "orange";
  return "red";
}

function labelForBucket(bucket: ScoreBucket): string {
  if (bucket === "excellent") return "Rất phù hợp";
  if (bucket === "good") return "Phù hợp";
  return "Không phù hợp";
}

function deterministicScoreFromId(id: number): number {
  // stable mock score (when backend hasn't calculated similarityScore yet)
  const x = (id * 9301 + 49297) % 233280;
  const r = x / 233280;
  return Math.round(55 + r * 40); // 55..95
}

const JobCvAIFilter = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<IJob | null>(null);
  const [rows, setRows] = useState<ApplicationRow[]>([]);

  // config
  const [thresholdExcellent, setThresholdExcellent] = useState(85);
  const [thresholdGood, setThresholdGood] = useState(70);
  const [bucketFilter, setBucketFilter] = useState<"all" | ScoreBucket>("all");

  // ui
  const [selected, setSelected] = useState<ApplicationRow | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchJob = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await JobApiById(id);
      if (res?.code === 1000 && res?.result) {
        setJob(res.result as IJob);
      } else {
        setJob(null);
      }
    } catch (e) {
      console.error("Fetch job detail error:", e);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const buildRowsFromJob = (jobData: IJob | null) => {
    const applications = jobData?.applicationList ?? [];
    const built: ApplicationRow[] = applications.map((a) => {
      const normalized = normalizeScore(a.similarityScore);
      const score = normalized ?? deterministicScoreFromId(a.id);
      const bucket = bucketForScore(score, thresholdExcellent, thresholdGood);
      const candidateName = a.candidate?.fullName || "Ứng viên";
      const candidateEmail = a.candidate?.email;
      const reason =
        normalized == null
          ? "Chưa có điểm AI từ hệ thống — dùng điểm tạm để thao tác UI"
          : bucket === "excellent"
          ? "Khớp JD tốt, phù hợp ưu tiên phỏng vấn"
          : bucket === "good"
          ? "Khớp phần lớn yêu cầu, cần review thêm"
          : "Khớp thấp, đề xuất loại";

      return {
        id: a.id,
        appliedAt: a.appliedAt,
        status: a.status,
        candidateName,
        candidateEmail,
        score,
        bucket,
        reason,
        raw: a,
      };
    });

    built.sort((x, y) => y.score - x.score);
    setRows(built);
  };

  useEffect(() => {
    buildRowsFromJob(job);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job, thresholdExcellent, thresholdGood]);

  const filteredRows = useMemo(() => {
    if (bucketFilter === "all") return rows;
    return rows.filter((r) => r.bucket === bucketFilter);
  }, [rows, bucketFilter]);

  const stats = useMemo(() => {
    const s = { excellent: 0, good: 0, reject: 0 };
    rows.forEach((r) => {
      s[r.bucket] += 1;
    });
    return s;
  }, [rows]);

  const handleRunAI = async () => {
    // This is a UI-first workflow: refresh job to pick up backend-calculated similarityScore.
    // If backend isn't ready yet, the UI still works with deterministic mock scores.
    await fetchJob();
  };

  return (
    <div style={{ padding: 20, background: "#f5f6fa", minHeight: "100vh" }}>
      {/* ================= JOB CONTEXT ================= */}
      <Card style={{ marginBottom: 16 }} loading={loading && !job}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: 20 }}>
                {job?.title || "AI CV Screening"}
              </Text>
              <Text type="secondary">
                {job?.company?.name ? `${job.company.name} • ` : ""}
                {job?.location || "—"}
              </Text>
            </Space>

            <Space wrap>
              {job?.status && (
                <Tag color={job.status === "OPEN" ? "green" : "red"}>
                  {job.status === "OPEN" ? "Đang tuyển" : "Đã đóng"}
                </Tag>
              )}
              <Tag color="blue">
                {(job?.applicationList?.length ?? 0).toLocaleString()} CV
              </Tag>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchJob}
                loading={loading}
              >
                Tải lại
              </Button>
              <Button
                type="primary"
                icon={<RobotOutlined />}
                onClick={handleRunAI}
                loading={loading}
                style={{
                  background: "linear-gradient(135deg,#1677ff,#69b1ff)",
                  border: "none",
                }}
              >
                Chạy / cập nhật điểm AI
              </Button>
            </Space>
          </Space>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Statistic
                title="Rất phù hợp"
                value={stats.excellent}
                prefix={<TrophyOutlined style={{ color: "#52c41a" }} />}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="Phù hợp"
                value={stats.good}
                prefix={<CheckCircleOutlined style={{ color: "#faad14" }} />}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="Không phù hợp"
                value={stats.reject}
                prefix={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
              />
            </Col>
          </Row>
        </Space>
      </Card>

      {/* ================= WORKSPACE ================= */}
      <Row gutter={16}>
        {/* CONFIG PANEL */}
        <Col xs={24} lg={7} xl={6}>
          <Card title="Cấu hình lọc" style={{ marginBottom: 16 }}>
            <Space direction="vertical" size={14} style={{ width: "100%" }}>
              <div>
                <Text strong>Ngưỡng “Rất phù hợp”</Text>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Slider
                    min={0}
                    max={100}
                    value={thresholdExcellent}
                    onChange={(v) => setThresholdExcellent(v)}
                    style={{ flex: 1 }}
                  />
                  <InputNumber
                    min={0}
                    max={100}
                    value={thresholdExcellent}
                    onChange={(v) => setThresholdExcellent(Number(v ?? 0))}
                  />
                </div>
              </div>

              <div>
                <Text strong>Ngưỡng “Phù hợp”</Text>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Slider
                    min={0}
                    max={100}
                    value={thresholdGood}
                    onChange={(v) => setThresholdGood(v)}
                    style={{ flex: 1 }}
                  />
                  <InputNumber
                    min={0}
                    max={100}
                    value={thresholdGood}
                    onChange={(v) => setThresholdGood(Number(v ?? 0))}
                  />
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Gợi ý: đặt ngưỡng “Phù hợp” thấp hơn “Rất phù hợp”.
                </Text>
              </div>

              <Divider style={{ margin: "8px 0" }} />

              <div>
                <Text strong>Hiển thị</Text>
                <div style={{ marginTop: 8 }}>
                  <Segmented
                    block
                    value={bucketFilter}
                    onChange={(v) => setBucketFilter(v as any)}
                    options={[
                      { label: "Tất cả", value: "all" },
                      { label: "Rất phù hợp", value: "excellent" },
                      { label: "Phù hợp", value: "good" },
                      { label: "Loại", value: "reject" },
                    ]}
                  />
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        {/* RESULTS */}
        <Col xs={24} lg={17} xl={18}>
          <Card>
            {rows.length === 0 ? (
              <Empty
                description={
                  <span>
                    Job này chưa có CV ứng tuyển. Khi có CV, bảng kết quả sẽ hiển thị ở đây.
                  </span>
                }
              />
            ) : (
              <ProTable<ApplicationRow>
                rowKey="id"
                search={false}
                loading={loading}
                dataSource={filteredRows}
                pagination={{ pageSize: 8, showSizeChanger: true }}
                headerTitle="Kết quả AI Screening"
                options={{ density: true, reload: false, setting: true, fullScreen: true }}
                columns={[
                  {
                    title: "Ứng viên",
                    dataIndex: "candidateName",
                    render: (_: ReactNode, entity: ApplicationRow) => (
                      <Space direction="vertical" size={0}>
                        <Text strong>{entity.candidateName}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {entity.candidateEmail || "—"}
                        </Text>
                      </Space>
                    ),
                  },
                  {
                    title: "AI Score",
                    dataIndex: "score",
                    width: 240,
                    sorter: (a, b) => a.score - b.score,
                    defaultSortOrder: "descend",
                    render: (_: ReactNode, entity: ApplicationRow) => {
                      const color = colorForBucket(entity.bucket);
                      return (
                        <Space direction="vertical" size={4} style={{ width: "100%" }}>
                          <Progress
                            percent={entity.score}
                            size="small"
                            strokeColor={color}
                            showInfo={false}
                          />
                          <Space>
                            <Tag color={color}>{labelForBucket(entity.bucket)}</Tag>
                            <Text type="secondary">{entity.score}/100</Text>
                          </Space>
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
                    title: "Hành động",
                    width: 170,
                    valueType: "option",
                    render: (_: ReactNode, entity: ApplicationRow) => (
                      [
                        <Button
                          key="view"
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => {
                            setSelected(entity);
                            setDrawerOpen(true);
                          }}
                        >
                          Xem
                        </Button>,
                        <Button
                          key="cv"
                          type="link"
                          icon={<FilePdfOutlined />}
                          onClick={() => {
                            setSelected(entity);
                            setDrawerOpen(true);
                          }}
                        >
                          CV
                        </Button>,
                      ]
                    ),
                  },
                ]}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Drawer
        title="Chi tiết ứng viên"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
      >
        {!selected ? (
          <Empty description="Chưa chọn ứng viên" />
        ) : (
          <Space direction="vertical" size={14} style={{ width: "100%" }}>
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="Tên">
                {selected.candidateName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selected.candidateEmail || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="AI Score">
                <Tag color={colorForBucket(selected.bucket)}>
                  {labelForBucket(selected.bucket)} • {selected.score}/100
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Nhận xét">
                {selected.reason}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái apply">
                {selected.status || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày nộp">
                {selected.appliedAt || "—"}
              </Descriptions.Item>
            </Descriptions>

            <Card type="inner" title="Xem CV">
              <Empty description="Chưa có URL/metadata file CV để preview. Khi backend trả về link file, mình sẽ gắn viewer tại đây." />
            </Card>
          </Space>
        )}
      </Drawer>
    </div>
  );
};

export default JobCvAIFilter;
