import { useState } from 'react';
import bannerLogin from '../../../assets/imgs/banner-login.png';
import googleIcon from '../../../assets/icons/googleIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { RegisterApi } from '../../../service/Api/Auth/Auth';

const Register = () => {
	const navigate = useNavigate();
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		if (!fullName || !email || !password || !confirmPassword) {
			message.error('Vui lòng nhập đầy đủ thông tin!');
			return;
		}

		if (password !== confirmPassword) {
			message.error('Mật khẩu nhập lại không khớp!');
			return;
		}

		setLoading(true);
		try {
			const response = await RegisterApi({ fullName, email, password, confirmPassword });
			if (response && response.result) {
				message.success('Đăng ký thành công! Vui lòng đăng nhập.');
				navigate('/auth/ca/login'); // Redirect to candidate login
			}
		} catch (error: any) {
			console.error(error);
			const errorMsg = error.response?.data?.message || error.message || 'Đã xảy ra lỗi khi đăng ký!';
			message.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-[900px] bg-white rounded-xl shadow overflow-hidden'>
			<div className='h-full flex'>
				<div className='flex-1'>
					<div className='py-6 px-10'>
						<div className='mb-6'>
							<p className='text-[14px] font-semibold text-center mb-4'>
								Người tìm việc
							</p>
							<p className='text-[20px] font-semibold text-center'>
								Đăng ký tài khoản
							</p>
						</div>
						<div className='mb-6 space-y-4'>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
								<input
									type='text'
									className='w-full text-[14px] font-semibold border border-[#4fccff] rounded-lg p-2 outline-none focus:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'
									placeholder='Nhập họ và tên'
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
								<input
									type='email'
									className='w-full text-[14px] font-semibold border border-[#4fccff] rounded-lg p-2 outline-none focus:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'
									placeholder='Nhập email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
								<input
									type='password'
									className='w-full text-[14px] font-semibold border border-[#4fccff] rounded-lg p-2 outline-none focus:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'
									placeholder='Nhập mật khẩu'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
								<input
									type='password'
									className='w-full text-[14px] font-semibold border border-[#4fccff] rounded-lg p-2 outline-none focus:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'
									placeholder='Nhập lại mật khẩu'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>

							<button
								onClick={handleRegister}
								disabled={loading}
								className={`border w-full rounded-lg border-none bg-[#5932bc] text-white text-[14px] py-2 mt-4 font-semibold hover:bg-[#2f0d7b] transition duration-300 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
							>
								{loading ? 'Đang xử lý...' : 'Đăng ký'}
							</button>
						</div>

						<div className='mt-5 mb-5 flex items-center before:w-full before:h-px before:bg-[#dfdfdf] after:w-full after:h-px after:bg-[#dfdfdf]'>
							<span className='text-gray-500 inline-block px-8'>Hoặc</span>
						</div>

						<div className='text-center mb-4'>
							<p className='text-sm'>
								Đã có tài khoản? <Link to='/auth/ca/login' className='text-[#5932bc] font-semibold hover:underline'>Đăng nhập ngay</Link>
							</p>
						</div>

						<div className='flex flex-col gap-2'>
							<div className=''>
								<button className='w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
									<img src={googleIcon} className='w-6' alt='google icon' />
									<div className='flex-1'>
										<p className='text-[14px] font-medium'>
											Đăng ký với Google
										</p>
									</div>
								</button>
							</div>

							<div className='mt-5'>
								<Link
									to='/'
									className='w-full flex rounded-lg p-2 outline-none bg-gray-100 text-gray-700 text-[14px] font-semibold hover:bg-gray-200 transition duration-300 cursor-pointer justify-center'
								>
									Quay lại trang chủ
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

export default Register;
