import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bannerLogin from '../../../../assets/imgs/banner-login.png';
import googleIcon from '../../../../assets/icons/googleIcon.png';
import emailIcon from '../../../../assets/icons/emailIcon.png';
import { LoginApi } from '../../../../service/Api/Auth/Auth';
import { message } from 'antd';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (!email || !password) {
			setError('Vui lòng nhập đầy đủ email và mật khẩu');
			return;
		}

		try {
			setLoading(true);
			setError('');

			const res = await LoginApi({ email, password });
			const data = res;

			if (data.code === 1000 && data.result) {
				localStorage.setItem('token', data.result.token);
				localStorage.setItem('user', JSON.stringify(data.result.user));
				message.success('Đăng nhập thành công');
				navigate('/');
			} else {
				setError(data.message || 'Đăng nhập thất bại');
			}
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Lỗi kết nối server');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-[900px] bg-white rounded-xl shadow overflow-hidden'>
			<div className='h-full flex'>
				<div className='flex-1'>
					<div className='py-6 px-10'>
						<div className='mb-10'>
							<p className='text-[14px] font-semibold text-center mb-4'>
								Người tìm việc
							</p>
							<p className='text-[20px] font-semibold text-center'>
								Đăng nhập hoặc Đăng kí
							</p>
						</div>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleLogin();
							}}
						>
							<div className='mb-4'>
								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full text-[14px] font-semibold border border-[#4fccff] rounded-lg p-2 outline-none focus:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'
									placeholder='Nhập email'
								/>
							</div>

							<div className='mb-4'>
								<input
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='w-full text-[14px] font-semibold border border-[#4fccff] rounded-lg p-2 outline-none focus:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'
									placeholder='Nhập mật khẩu'
								/>
							</div>

							{error && (
								<p className='text-red-500 text-[13px] mb-2 text-center'>
									{error}
								</p>
							)}

							<button
								type='submit'
								disabled={loading}
								className='border w-full rounded-lg border-none bg-[#5932bc] text-white text-[14px] py-2 mt-2 font-semibold hover:bg-[#2f0d7b] transition duration-300 cursor-pointer disabled:opacity-60'
							>
								{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
							</button>
						</form>

						<div className='mt-5 mb-5 flex items-center before:w-full before:h-px before:bg-[#dfdfdf] after:w-full after:h-px after:bg-[#dfdfdf]'>
							<span className='text-gray-500 inline-block px-8'>Hoặc</span>
						</div>

						<div className='flex flex-col gap-2'>
							<button className='w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
								<img src={googleIcon} className='w-6' alt='google icon' />
								<div className='flex-1'>
									<p className='text-[14px] font-medium'>
										Đăng nhập với Google
									</p>
								</div>
							</button>
							<button className='w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
								<img src={emailIcon} className='w-6' alt='email icon' />
								<div className='flex-1'>
									<p className='text-[14px] font-medium'>Đăng nhập với Email</p>
								</div>
							</button>
							<div className='text-center text-[14px] font-semibold mt-3'>
								Bạn chưa có tài khoản?{' '}
								<Link
									to='/auth/ca/register'
									className='text-blue-500 hover:underline'
								>
									Đăng ký
								</Link>
							</div>
							<div className='mt-5'>
								<Link
									to='/'
									className='w-full flex rounded-lg p-2 outline-none bg-[#5932bc] text-white text-[14px] font-semibold hover:bg-[#2f0d7b] transition duration-300 cursor-pointer'
								>
									<p className='text-[14px] mx-auto font-medium'>
										Quay lại trang chủ
									</p>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className='flex-1 h-full'>
					<img
						src={bannerLogin}
						alt='banner login'
						className='w-full h-full object-cover'
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
