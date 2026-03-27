import { Form, Input, Divider, message } from 'antd';
import {
	MailOutlined,
	LockOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
} from '@ant-design/icons';
import googleIcon from '../../../../assets/icons/googleIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../../../../service/Api/Auth/Auth';
import { useState } from 'react';

const Login = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			const response = await LoginApi({ email: values.email, password: values.password });
			if (response && response.result) {
				const { token, user } = response.result;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				message.success('Đăng nhập nhà tuyển dụng thành công!');
				navigate('/recruiter/dashboard');
			}
		} catch (error: any) {
			console.error(error);
			const errorMsg = error.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập!';
			message.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1 className=' text-2xl text-center font-semibold mb-6 text-gray-800'>
				Nhà tuyển dụng đăng nhập
			</h1>

			<div className='bg-white p-8 rounded-xl shadow-md w-[450px]  border border-gray-100'>
				<div className=''>
					<button className='w-full bg-[#2563eb] text-white flex items-center border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
						<img
							src={googleIcon}
							className='w-7 bg-white p-1 rounded-sm'
							alt='google icon'
						/>
						<div className='flex-1'>
							<p className='text-[14px] font-medium'>Đăng nhập với Google</p>
						</div>
					</button>
				</div>

				<Divider plain className='text-gray-400 font-semibold!'>
					Hoặc
				</Divider>

				<Form
					name='login_form'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					layout='vertical'
				>
					<Form.Item
						name='email'
						rules={[
							{ required: true, message: 'Vui lòng nhập email!' },
							{ type: 'email', message: 'Email không hợp lệ!' },
						]}
					>
						<Input
							prefix={<MailOutlined className='text-gray-400' />}
							placeholder='Nhập email'
							className='h-11 rounded-md'
						/>
					</Form.Item>

					<Form.Item
						name='password'
						rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
					>
						<Input.Password
							prefix={<LockOutlined className='text-gray-400' />}
							placeholder='Nhập mật khẩu'
							className='h-11 rounded-md'
							iconRender={(visible) =>
								visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
							}
						/>
					</Form.Item>

					<Form.Item className='mb-3!'>
						<button
							type='submit'
							disabled={loading}
							className={`w-full transition duration-300 text-white cursor-pointer hover:bg-[#2e068b] border-none rounded-md text-base font-semibold! bg-[#542ab6] py-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
						>
							{loading ? 'Đang xử lý...' : 'Đăng nhập'}
						</button>
					</Form.Item>
				</Form>

				<div className='text-center text-[14px] font-semibold'>
					Bạn chưa có tài khoản?{' '}
					<Link to='/auth/re/register' className='text-blue-500 hover:underline'>
						Đăng ký
					</Link>
					<a
						href='/forgot-password'
						className='mt-2 text-blue-500 block text-center text-[14px] font-semibold hover:underline'
					>
						Quên mật khẩu
					</a>
				</div>

				<Link
					to='/'
					className='mt-10 border border-[#542ab6] text-[#542ab6] text-center block  cursor-pointer rounded-md text-base font-semibold!  py-2'
				>
					Quay lại trang chủ
				</Link>
			</div>

			<footer className='mt-auto text-center py-6 text-gray-400 text-[12px]'>
				© 2026 - Bản quyền thuộc về SieuViet Group
			</footer>
		</div>
	);
};

export default Login;
