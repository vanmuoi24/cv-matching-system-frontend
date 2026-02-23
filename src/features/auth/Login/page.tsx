import bannerLogin from '../../../assets/imgs/banner-login.png';
import googleIcon from '../../../assets/icons/googleIcon.png';
import emailIcon from '../../../assets/icons/emailIcon.png';
import { Link } from 'react-router-dom';

const Login = () => {
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
						<div className='mb-6'>
							<input
								type='text'
								className='w-full text-[14px] font-semibold border border-[#4fccff] rounded-lg p-2 outline-none focus:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'
								placeholder='Nhập số điện thoại của bạn'
							/>
							<button className='border w-full rounded-lg border-none bg-[#5932bc] text-white text-[14px] py-2 mt-4 font-semibold hover:bg-[#2f0d7b] transition duration-300 cursor-pointer'>
								Tiếp tục
							</button>
						</div>
						<div className='mt-5 mb-5 flex items-center before:w-full before:h-px before:bg-[#dfdfdf] after:w-full after:h-px after:bg-[#dfdfdf]'>
							<span className='text-gray-500 inline-block px-8'>Hoặc</span>
						</div>
						<div className='flex flex-col gap-2'>
							<div className=''>
								<button className='w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
									<img src={googleIcon} className='w-6' alt='google icon' />
									<div className='flex-1'>
										<p className='text-[14px] font-medium'>
											Đăng nhập với Google
										</p>
									</div>
								</button>
							</div>
							<div className=''>
								<button className='w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
									<img src={emailIcon} className='w-6' alt='email icon' />
									<div className='flex-1'>
										<p className='text-[14px] font-medium'>
											Đăng nhập với Email
										</p>
									</div>
								</button>
							</div>
							<div className='mt-5 text-[12px] font-medium'>
								<p>
									Bằng việc đăng nhập, tôi đồng ý chia sẻ thông tin cá nhân của
									mình với nhà tuyển dụng theo các{' '}
									<span className='text-[#4fccff] cursor-pointer'>
										Điều khoản sử dụng
									</span>
									,{' '}
									<span className='text-[#4fccff] cursor-pointer'>
										Chính sách bảo mật
									</span>{' '}
									và{' '}
									<span className='text-[#4fccff] cursor-pointer'>
										Chính sách dữ liệu cá nhân
									</span>{' '}
									của CV24h
								</p>
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
