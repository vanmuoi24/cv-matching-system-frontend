import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Row, Col, Button, Modal } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { GetListCompany } from "../../../../../service/Api/Company/Company";
import type { ICompany } from "../../../../../types/TypeCompany";
import "./ViewMode.css";

interface JobFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: any; // dữ liệu job khi view
}
const JobForm = ({ open, onClose, initialData }: JobFormProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        ...initialData,
        companyId: initialData.company?.id,
        companyName: initialData.company?.name,
      });
    }
    if (!open) {
      form.resetFields();
    }
  }, [open, initialData, form]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={"Thông tin tuyển dụng"}
      footer={null}
      width={900}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        disabled
        className={"form-view-mode"}
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
              name="companyName"
              rules={[{ required: true, message: "Chọn công ty" }]}
            >
              <Input prefix={<FileTextOutlined />} size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Trạng thái" name="status">
              <Input prefix={<FileTextOutlined />} size="large" />
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
              <Input prefix={<FileTextOutlined />} size="large" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Loại hình công việc"
              name="jobType"
              rules={[{ required: true, message: "Chọn loại hình" }]}
            >
              <Input prefix={<FileTextOutlined />} size="large" />
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
            <Button disabled={false} onClick={onClose}>
              Hủy
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default JobForm;
