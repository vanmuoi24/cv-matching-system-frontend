import React from 'react';
import { User, Mail, Phone, HelpCircle } from 'lucide-react'; // Sử dụng Lucide React cho icon

const ContactFormSection = () => {
	return (
		<section className='bg-[#f0f4f8] py-16 px-4'>
			<div className='max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl flex flex-col md:flex-row bg-white'>
				{/* Bên trái: Hình ảnh và Thông điệp */}
				<div className='relative md:w-1/2 min-h-[300px] flex items-center p-8 md:p-12'>
					{/* Background Image với Overlay */}
					<div
						className='absolute inset-0 bg-cover bg-center'
						style={{
							backgroundImage: `url('https://img.freepik.com/free-photo/customer-service-operator-working-headset-office_23-2148118023.jpg')`,
						}}
					>
						<div className='absolute inset-0 bg-black/60'></div>
					</div>

					{/* Nội dung chữ */}
					<div className='relative z-10 text-white'>
						<div className='w-12 h-1 bg-blue-500 mb-6'></div>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							Hãy để chúng tôi hỗ trợ bạn
						</h2>
						<p className='text-gray-200 text-lg leading-relaxed'>
							Chúng tôi luôn sẵn sàng hỗ trợ tư vấn và giải đáp mọi thắc mắc của
							bạn về tuyển dụng nhân sự qua CV24h
						</p>
					</div>
				</div>

				{/* Bên phải: Form đăng ký */}
				<div className='md:w-1/2 p-8 md:p-12 bg-white'>
					<div className='text-center mb-8'>
						<h3 className='text-2xl font-bold mb-2'>Đăng ký tư vấn</h3>
						<p className='text-gray-500 text-sm'>
							Vui lòng để lại thông tin, chúng tôi sẽ liên lạc lại với bạn sớm
							nhất có thể.
						</p>
					</div>

					<form className='space-y-4'>
						{/* Họ và tên */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Họ và tên
							</label>
							<div className='relative'>
								<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
									<User size={18} />
								</span>
								<input
									type='text'
									placeholder='Tên của bạn'
									className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all'
								/>
							</div>
						</div>

						{/* Địa chỉ email */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Địa chỉ email
							</label>
							<div className='relative'>
								<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
									<Mail size={18} />
								</span>
								<input
									type='email'
									placeholder='Email của bạn'
									className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none'
								/>
							</div>
						</div>

						{/* Số điện thoại */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Số điện thoại
							</label>
							<div className='relative'>
								<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
									<Phone size={18} />
								</span>
								<input
									type='tel'
									placeholder='Số điện thoại'
									className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none'
								/>
							</div>
						</div>

						{/* Nhu cầu tư vấn */}
						<div>
							<label className=' block text-sm font-medium text-gray-700 mb-1'>
								Nhu cầu tư vấn
							</label>
							<div className='relative '>
								<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none'>
									<HelpCircle size={18} />
								</span>
								<select className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 cursor-pointer  focus:border-transparent outline-none appearance-none bg-white'>
									<option value=''>Chọn nhu cầu</option>
									<option value='tuyen-dung'>Tư vấn tuyển dụng</option>
									<option value='quang-cao'>Báo giá quảng cáo</option>
								</select>
								<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400'>
									<svg className='h-4 w-4 fill-current' viewBox='0 0 20 20'>
										<path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
									</svg>
								</div>
							</div>
						</div>

						{/* Nút Gửi */}
						<button className='w-full px-20 py-4 text-white cursor-pointer bg-[#5932bc] hover:bg-[#2f0d7b]  border-none rounded text-base font-medium shadow-lg transition duration-300'>
							Yêu cầu tư vấn
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactFormSection;
