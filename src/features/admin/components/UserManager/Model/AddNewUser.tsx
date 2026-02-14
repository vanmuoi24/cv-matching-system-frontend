import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Space } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { IUser } from '../../../../../types/TypeUser';

interface IAddNewUserProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<IUser>) => Promise<void>;
}

const AddNewUser: React.FC<IAddNewUserProps> = ({
  visible,
  onClose,
  onSubmit,
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

      const submitData: Partial<IUser> = {
        fullName: values.fullName,
        email: values.email,
        role: values.role || 'CANDIDATE',
        status: values.status || 'ACTIVE',
      };

      await onSubmit(submitData);
      
      message.success('Thêm người dùng thành công!');
      form.resetFields();
      onClose();
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PlusOutlined />
          <span>Thêm người dùng mới</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[
            { required: true, message: 'Vui lòng nhập họ tên' },
            { min: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
          ]}
        >
          <Input
            placeholder="Nhập họ tên"
            prefix={<UserOutlined />}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            {
              type: 'email',
              message: 'Email không hợp lệ',
            },
          ]}
        >
          <Input
            placeholder="example@email.com"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
          initialValue="CANDIDATE"
        >
          <Select
            options={[
              { label: 'Quản trị viên', value: 'ADMIN' },
              { label: 'Nhà tuyển dụng', value: 'RECRUITER' },
              { label: 'Ứng viên', value: 'CANDIDATE' },
            ]}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          initialValue="ACTIVE"
        >
          <Select
            options={[
              { label: 'Hoạt động', value: 'ACTIVE' },
              { label: 'Bị khóa', value: 'INACTIVE' },
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
              Thêm người dùng
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewUser;
