import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Space, Avatar, Tag } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import type { IUser } from '../../../../../types/TypeUser';

interface IEditUserProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<IUser>) => Promise<void>;
  initialData?: IUser;
}

const EditUser: React.FC<IEditUserProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue({
        fullName: initialData.fullName,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
      });
    }
  }, [visible, initialData, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData: Partial<IUser> = {
        id: initialData?.id,
        fullName: values.fullName,
        email: values.email,
        role: values.role,
        status: values.status,
      };

      await onSubmit(submitData);
      
      message.success('Cập nhật người dùng thành công!');
      form.resetFields();
      onClose();
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const getRoleLabel = (role: string) => {
    const roleMap: any = {
      'ADMIN': 'Quản trị viên',
      'RECRUITER': 'Nhà tuyển dụng',
      'CANDIDATE': 'Ứng viên',
    };
    return roleMap[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colorMap: any = {
      'ADMIN': 'blue',
      'RECRUITER': 'orange',
      'CANDIDATE': 'green',
    };
    return colorMap[role] || 'default';
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <EditOutlined />
          <span>Chỉnh sửa thông tin người dùng</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {initialData && (
        <div style={{ marginBottom: 20, padding: '12px', backgroundColor: '#fafafa', borderRadius: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar icon={<UserOutlined />} size={48} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{initialData.fullName}</div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                {initialData.email}
              </div>
              <div style={{ fontSize: 12 }}>
                <Tag color={getRoleColor(initialData.role)}>
                  {getRoleLabel(initialData.role)}
                </Tag>
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
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
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
            <Button type="primary" htmlType="submit" loading={loading} icon={<EditOutlined />}>
              Cập nhật người dùng
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
