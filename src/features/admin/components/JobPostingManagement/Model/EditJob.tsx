import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Button,
  Modal,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { GetListCompany } from "../../../../../service/Api/Company/Company";
import type { ICompany } from "../../../../../types/TypeCompany";

interface JobFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any; // dữ liệu job khi edit
}

const JobForm = ({ open, onClose, onSubmit, initialData }: JobFormProps) => {
  const [form] = Form.useForm();
  const [companyOptions, setCompanyOptions] = useState<ICompany[]>([]);

  useEffect(() => {
    // TODO: thay bằng API thật
    const fetchCompanies = async () => {
      const res1 = await GetListCompany();
      if (res1?.code === 1000 && res1.result) {
        setCompanyOptions(res1.result);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        ...initialData,
        companyId: initialData.company?.id,
      });
    }
    if (!open) {
      form.resetFields();
    }
  }, [open, initialData, form]);

  const handleFinish = (values: any) => {
    const submitData = {
      id: initialData?.id,
      title: values.title,
      category: values.category,
      jobType: values.jobType,
      minSalary: values.minSalary,
      maxSalary: values.maxSalary,
      location: values.location,
      status: values.status,
      skills: values.skills,
      description: values.description,
      requirement: values.requirement,
      companyId: values.companyId, // backend cần cái này
    };

    onSubmit(submitData);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={initialData ? "Cập nhật Job" : "Thêm Job mới"}
      footer={null}
      width={900}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark="optional"
      >
        {/* Hàng 1 */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Vị trí tuyển dụng"
              name="title"
              rules={[{ required: true, message: "Nhập vị trí tuyển dụng" }]}
            >
              <Input prefix={<FileTextOutlined />} size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Công ty"
              name="companyId"
              rules={[{ required: true, message: "Chọn công ty" }]}
            >
              <Select
                size="large"
                placeholder="Chọn công ty"
                options={companyOptions.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Trạng thái" name="status">
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

        {/* Hàng 2 */}
        <Row gutter={16}>
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
              label="Loại hình công việc"
              name="jobType"
              rules={[{ required: true, message: "Chọn loại hình" }]}
            >
              <Select
                size="large"
                options={[
                  { label: "Toàn thời gian", value: "FULL_TIME" },
                  { label: "Bán thời gian", value: "PART_TIME" },
                  { label: "Thực tập", value: "INTERN" },
                  { label: "Freelance", value: "FREELANCE" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Địa điểm" name="location">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* Hàng 3 */}
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
            <Form.Item label="Kỹ năng" name="skills">
              <Input size="large" placeholder="VD: React, Java, SQL" />
            </Form.Item>
          </Col>
        </Row>

        {/* Textarea */}
        <Form.Item label="Mô tả công việc" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Yêu cầu" name="requirement">
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Actions */}
        <Row justify="end" gutter={12}>
          <Col>
            <Button onClick={onClose}>Hủy</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {initialData ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default JobForm;
