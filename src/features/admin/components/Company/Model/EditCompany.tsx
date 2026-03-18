import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Upload, Space, Avatar } from 'antd';
import { UploadOutlined, EditOutlined, BankOutlined } from '@ant-design/icons';
import type { ICompany } from '../../../../../types/TypeCompany';

interface IEditCompanyProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ICompany>) => Promise<void>;
  initialData?: ICompany;
}

const EditCompany: React.FC<IEditCompanyProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<any>(null);
  const [currentLogo, setCurrentLogo] = useState<string>('');

  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue({
        name: initialData.name,
        description: initialData.description,
        website: initialData.website,
        status: initialData.status,
      });
      // Handle both camelCase and snake_case from API
      setCurrentLogo(initialData.logoUrl || (initialData as any).logo_url || '');
      setLogoFile(null);
    }
  }, [visible, initialData, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData: any = {
        name: values.name,
        description: values.description,
        website: values.website,
        status: values.status,
      };

      if (logoFile) {
        submitData.logo = logoFile.originFileObj || logoFile;
      }

      await onSubmit(submitData);

      message.success('Cập nhật công ty thành công!');
      onClose();
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ file }: any) => {
    // Only keep the most recent file
    setLogoFile(file.status === 'removed' ? null : file);
  };

  const handleRemoveLogoClick = () => {
    setCurrentLogo('');
    setLogoFile(null);
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <EditOutlined />
          <span>Chỉnh sửa thông tin công ty</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      {initialData && (
        <div style={{ marginBottom: 20, padding: '12px', backgroundColor: '#fafafa', borderRadius: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar
              src={currentLogo}
              icon={<BankOutlined />}
              size={48}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{initialData.name}</div>
              <div style={{ fontSize: 12, color: '#666' }}>
                Tạo ngày: {new Date(initialData.createAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      )}

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

        <Form.Item label="Cập nhật logo">
          {currentLogo && (
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar src={currentLogo} size={40} icon={<BankOutlined />} />
              <span style={{ fontSize: 12, color: '#666' }}>Logo hiện tại</span>
              <Button
                type="text"
                danger
                size="small"
                onClick={handleRemoveLogoClick}
              >
                Xóa
              </Button>
            </div>
          )}
          <Upload
            maxCount={1}
            accept="image/*"
            onChange={handleUploadChange}
            beforeUpload={() => false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>
              {logoFile ? 'Chọn ảnh khác' : 'Chọn ảnh logo'}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
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
            <Button type="primary" htmlType="submit" loading={loading} icon={<EditOutlined />}>
              Cập nhật công ty
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCompany;
