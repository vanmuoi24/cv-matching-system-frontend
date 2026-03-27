import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Lock, Key, ShieldCheck } from 'lucide-react';
import { ChangePasswordApi } from '../../../../../service/Api/Auth/Auth';
import type { IChangePasswordRequest } from '../../../../../types/ChangePassword';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onFinish = async (values: IChangePasswordRequest) => {
		if (values.newPassword !== values.confirmPassword) {
			message.error('Mật khẩu mới không khớp!');
			return;
		}

		setLoading(true);
		try {
			const requestData: IChangePasswordRequest = {
				oldPassword: values.oldPassword,
				newPassword: values.newPassword,
				confirmPassword: values.confirmPassword,
				token: localStorage.getItem('token') || undefined,
			};

			const res = await ChangePasswordApi(requestData);
			console.log('ChangePassword Response:', res);

			if (res.code == 1000 || res.code == 200 || res.code === 0) {
				console.info('ChangePassword Success block entered');
				message.success(
					'Đổi mật khẩu thành công! Vui lòng chờ để được chuyển về trang đăng nhập.',
					5,
				);

				// Get role before clearing
				const userLocal = localStorage.getItem('user');
				const role = userLocal
					? JSON.parse(userLocal).role?.toString().toUpperCase()
					: 'USER';

				form.resetFields();
				localStorage.clear();

				// Redirect based on role
				setTimeout(() => {
					navigate(role === 'RECRUITER' ? '/auth/re/login' : '/auth/ca/login');
				}, 2000);
			} else {
				message.error(
					res.message ||
						'Đổi mật khẩu không thành công. Vui lòng kiểm tra lại mật khẩu cũ.',
				);
			}
		} catch (error: unknown) {
			console.error('ChangePassword API Error:', error);
			const err = error as any;
			message.error(
				err.response?.data?.message ||
					'Hệ thống đang bận. Vui lòng thử lại sau.',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='max-w-2xl mx-auto'
		>
			<div className=' overflow-hidden'>
				<div className='p-10'>
					<h2 className='text-xl font-black text-[#2f0d7b] mb-8 uppercase tracking-tight'>
						Đổi mật khẩu
					</h2>
					<Form
						form={form}
						layout='vertical'
						onFinish={onFinish}
						className='space-y-6'
						requiredMark={false}
					>
						<Form.Item
							label={
								<span className='font-black text-[12px] uppercase tracking-widest text-[#2f0d7b]/60 mb-1 ml-1'>
									Mật khẩu hiện tại
								</span>
							}
							name='oldPassword'
							rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
						>
							<Input.Password
								prefix={<Key size={18} className='text-gray-300 mr-3' />}
								placeholder='Nhập mật khẩu hiện tại của bạn'
								className='rounded-2xl h-14 border-gray-100 hover:border-[#4fccff] focus:border-[#4fccff] shadow-none bg-gray-50/50 transition-all font-bold'
							/>
						</Form.Item>

						<Form.Item
							label={
								<span className='font-black text-[12px] uppercase tracking-widest text-[#2f0d7b]/60 mb-1 ml-1'>
									Mật khẩu mới
								</span>
							}
							name='newPassword'
							rules={[
								{ required: true, message: 'Nhập mật khẩu mới' },
								{ min: 6, message: 'Tối thiểu 6 ký tự' },
							]}
						>
							<Input.Password
								prefix={<Lock size={18} className='text-gray-300 mr-3' />}
								placeholder='Mật khẩu mới'
								className='rounded-2xl h-14 border-gray-100 hover:border-[#4fccff] focus:border-[#4fccff] shadow-none bg-gray-50/50 transition-all font-bold'
							/>
						</Form.Item>

						<Form.Item
							label={
								<span className='font-black text-[12px] uppercase tracking-widest text-[#2f0d7b]/60 mb-1 ml-1'>
									Xác nhận mật khẩu
								</span>
							}
							name='confirmPassword'
							rules={[
								{ required: true, message: 'Xác nhận lại mật khẩu' },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('newPassword') === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('Không khớp!'));
									},
								}),
							]}
						>
							<Input.Password
								prefix={
									<ShieldCheck size={18} className='text-gray-300 mr-3' />
								}
								placeholder='Nhập lại mật khẩu'
								className='rounded-2xl h-14 border-gray-100 hover:border-[#4fccff] focus:border-[#4fccff] shadow-none bg-gray-50/50 transition-all font-bold'
							/>
						</Form.Item>

						<Form.Item className='pt-6 mb-0'>
							<Button
								type='primary'
								htmlType='submit'
								loading={loading}
								className='w-full h-14 bg-[#2f0d7b]! border-none rounded-2xl text-[15px] font-black uppercase tracking-wider shadow-xl shadow-[#4fccff]/25 transition-all relative overflow-hidden group'
							>
								<span className='relative z-10 '>Cập nhật bảo mật</span>
								<div className='absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500'></div>
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</motion.div>
	);
};

export default ChangePassword;
