import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Upload, Space } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { ICompany } from '../../../../../types/TypeCompany';

interface IAddNewCompanyProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ICompany>) => Promise<void>;
}

const AddNewCompany: React.FC<IAddNewCompanyProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<any>(null);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setLogoFile(null);
    }
  }, [visible, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData: any = {
        name: values.name,
        description: values.description,
        website: values.website,
        status: values.status || 'ACTIVE',
      };

      if (logoFile) {
        submitData.logo = logoFile.originFileObj || logoFile;
      }

      await onSubmit(submitData);

      message.success('Thêm công ty thành công!');
      onClose();
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ file }: any) => {
    setLogoFile(file);
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PlusOutlined />
          <span>Thêm công ty mới</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        <Form.Item
          label="Tên công ty"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên công ty' },
            { min: 2, message: 'Tên công ty phải có ít nhất 2 ký tự' },
          ]}
        >
          <Input
            placeholder="Nhập tên công ty"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả công ty' },
            { min: 10, message: 'Mô tả phải có ít nhất 10 ký tự' },
          ]}
        >
          <Input.TextArea
            placeholder="Nhập mô tả công ty"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            { required: true, message: 'Vui lòng nhập website' },
            {
              pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
              message: 'Vui lòng nhập URL website hợp lệ',
            },
          ]}
        >
          <Input
            placeholder="https://example.com"
            size="large"
          />
        </Form.Item>

        <Form.Item label="Logo công ty">
          <Upload
            maxCount={1}
            accept="image/*"
            onChange={handleUploadChange}
            beforeUpload={() => false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>
              Chọn ảnh logo
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          initialValue="ACTIVE"
        >
          <Select
            options={[
              { label: 'Hoạt động', value: 'ACTIVE' },
              { label: 'Ngừng hoạt động', value: 'INACTIVE' },
            ]}
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} icon={<PlusOutlined />}>
              Thêm công ty
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewCompany;
