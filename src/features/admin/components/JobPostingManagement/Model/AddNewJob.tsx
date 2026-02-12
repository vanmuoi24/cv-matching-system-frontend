import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Space,
  InputNumber,
  Row,
  Col,
  DatePicker,
} from "antd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";
import type { IJob } from "../../../../../types/TypeJob";
import type { ICompany } from "../../../../../types/TypeCompany";

interface IAddNewJobProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  companies?: ICompany[];
}

const skillOptions = [
  { label: "React", value: "React" },
  { label: "Java", value: "Java" },
  { label: "Spring Boot", value: "Spring Boot" },
  { label: "NodeJS", value: "NodeJS" },
  { label: "SQL", value: "SQL" },
  { label: "Docker", value: "Docker" },
];

const AddNewJob: React.FC<IAddNewJobProps> = ({
  visible,
  onClose,
  onSubmit,
  companies = [],
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const submitData: Partial<IJob> & { companyId?: number } = {
        title: values.title,
        description: values.description,
        requirement: values.requirement,
        skills: values.skills?.join(", "),
        location: values.location,
        jobType: values.jobType,
        category: values.category,
        minSalary: values.minSalary,
        maxSalary: values.maxSalary,
        status: values.status || "OPEN",
        expiredAt: values.expiredAt?.toISOString(),
      };

      await onSubmit({
        ...submitData,
        companyId: values.companyId,
      });

      message.success("Tạo job thành công!");
      form.resetFields();
      onClose();
    } catch (err: any) {
      message.error(err?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <PlusOutlined />
          <span>Tạo vị trí tuyển dụng mới</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* 1 hàng 1 ô */}
        <Form.Item
          label="Tên vị trí"
          name="title"
          rules={[{ required: true, message: "Nhập tên vị trí" }]}
        >
          <Input prefix={<FileTextOutlined />} size="large" />
        </Form.Item>

        <Form.Item
          label="Mô tả công việc"
          name="description"
          rules={[{ required: true, message: "Nhập mô tả công việc" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Yêu cầu"
          name="requirement"
          rules={[{ required: true, message: "Nhập yêu cầu" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Select kỹ năng */}
        <Form.Item
          label="Kỹ năng"
          name="skills"
          rules={[{ required: true, message: "Chọn ít nhất 1 kỹ năng" }]}
        >
          <Select
            mode="multiple"
            size="large"
            allowClear
            placeholder="Chọn kỹ năng"
            options={skillOptions}
          />
        </Form.Item>

        {/* 1 hàng 3 ô */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Công ty"
              name="companyId"
              rules={[{ required: true, message: "Chọn công ty" }]}
            >
              <Select
                size="large"
                placeholder="Chọn công ty"
                options={companies.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Danh mục"
              name="category"
              rules={[{ required: true, message: "Chọn danh mục" }]}
            >
              <Select
                size="large"
                options={[
                  { label: "IT / Software", value: "IT_SOFTWARE" },
                  { label: "Data / AI", value: "DATA_AI" },
                  { label: "Cyber Security", value: "CYBER_SECURITY" },
                  { label: "DevOps / Cloud", value: "DEVOPS_CLOUD" },
                  { label: "Product Management", value: "PRODUCT" },
                  { label: "Project Management", value: "PROJECT" },

                  { label: "Marketing", value: "MARKETING" },
                  { label: "Digital Marketing", value: "DIGITAL_MARKETING" },
                  { label: "Content Creator", value: "CONTENT" },
                  { label: "SEO / SEM", value: "SEO_SEM" },
                  { label: "Brand Management", value: "BRAND" },

                  { label: "Sales", value: "SALES" },
                  { label: "Business Development", value: "BUSINESS_DEV" },
                  { label: "Customer Service", value: "CUSTOMER_SERVICE" },

                  { label: "Finance", value: "FINANCE" },
                  { label: "Accounting", value: "ACCOUNTING" },
                  { label: "Banking", value: "BANKING" },
                  { label: "Investment", value: "INVESTMENT" },

                  { label: "Human Resources (HR)", value: "HR" },
                  { label: "Recruitment", value: "RECRUITMENT" },
                  { label: "Training & Development", value: "TRAINING" },

                  { label: "Design (UI/UX/Graphic)", value: "DESIGN" },
                  { label: "Multimedia", value: "MULTIMEDIA" },
                  { label: "Architecture", value: "ARCHITECTURE" },

                  { label: "Operations", value: "OPERATIONS" },
                  { label: "Supply Chain", value: "SUPPLY_CHAIN" },
                  { label: "Logistics", value: "LOGISTICS" },
                  { label: "Procurement", value: "PROCUREMENT" },

                  { label: "Manufacturing", value: "MANUFACTURING" },
                  { label: "Construction", value: "CONSTRUCTION" },
                  { label: "Mechanical Engineering", value: "MECHANICAL" },
                  { label: "Electrical Engineering", value: "ELECTRICAL" },

                  { label: "Healthcare", value: "HEALTHCARE" },
                  { label: "Pharmaceutical", value: "PHARMA" },
                  { label: "Education", value: "EDUCATION" },
                  { label: "Legal", value: "LEGAL" },

                  { label: "Hospitality", value: "HOSPITALITY" },
                  { label: "Tourism", value: "TOURISM" },
                  { label: "Food & Beverage", value: "FNB" },

                  { label: "Real Estate", value: "REAL_ESTATE" },
                  { label: "Insurance", value: "INSURANCE" },

                  { label: "Media & Communication", value: "MEDIA" },
                  { label: "Public Relations (PR)", value: "PR" },

                  { label: "Administration", value: "ADMIN" },
                  { label: "Government / Public Sector", value: "GOVERNMENT" },

                  { label: "Others", value: "OTHERS" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Loại hình"
              name="jobType"
              rules={[{ required: true, message: "Chọn loại hình" }]}
            >
              <Select
                size="large"
                options={[
                  { label: "Full-time", value: "FULL_TIME" },
                  { label: "Part-time", value: "PART_TIME" },
                  { label: "Intern", value: "INTERN" },
                  { label: "Freelance", value: "FREELANCE" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Lương tối thiểu" name="minSalary">
              <InputNumber min={0} style={{ width: "100%" }} size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Lương tối đa" name="maxSalary">
              <InputNumber min={0} style={{ width: "100%" }} size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Hạn nộp" name="expiredAt">
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Địa điểm" name="location">
              <Input size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Trạng thái" name="status" initialValue="OPEN">
              <Select
                size="large"
                options={[
                  { label: "Đang tuyển", value: "OPEN" },
                  { label: "Tạm dừng", value: "PAUSE" },
                  { label: "Đã đóng", value: "CLOSED" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={onClose}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<PlusOutlined />}
            >
              Tạo vị trí
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewJob;
