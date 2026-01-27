import {
	FacebookFilled,
	YoutubeFilled,
	LinkedinFilled,
} from '@ant-design/icons';
import Container from './Container';
import ContactSupport from './ContactSupport';

const Footer = () => {
	return (
		<>
			<ContactSupport />
			<footer className='bg-[#351e5e] text-white text-sm pt-10 pb-4'>
				<Container>
					{/* --- GRID CONTENT --- */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10'>
						{/* Cột 1: Về chúng tôi */}
						<div className='space-y-3'>
							<h4 className='font-bold text-lg mb-4'>Về chúng tôi</h4>
							<p className='font-bold'>CV24h.vn - Công Ty Cổ Phần CV24h</p>
							<p>
								Phòng 102, Tòa nhà 20-20B Trần Cao Vân, Phường Đa Kao, Quận 1,
								TP. Hồ Chí Minh
							</p>
							<p>
								Chi nhánh: Tầng 6, Tòa nhà CMC, Số 11 Phố Duy Tân, Phường Dịch
								Vọng Hậu, Cầu Giấy, Hà Nội
							</p>
							<p>
								Giấy phép hoạt động dịch vụ việc làm số:
								28937/2024/SLĐTBXH-VLATLĐ do Sở Lao Động Thương Binh và Xã Hội
								cấp ngày 18/11/2024
							</p>
							<p>Điện thoại: (028) 7108 2424 | (024) 7308 2424</p>
							<p>Email hỗ trợ người tìm việc: ntv@cv24h.vn</p>
							<p>Email hỗ trợ nhà tuyển dụng: ntd@cv24h.vn</p>
						</div>

						{/* Cột 2: Thông tin */}
						<div>
							<h4 className='font-bold text-lg mb-4'>Thông tin</h4>
							<ul className='space-y-2'>
								<li>
									<a href='#' className='hover:text-gray-300'>
										Cẩm nang nghề nghiệp
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-gray-300'>
										Báo giá dịch vụ
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-gray-300'>
										Điều khoản sử dụng
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-gray-300'>
										Quy định bảo mật
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-gray-300'>
										Sơ đồ trang web
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-gray-300'>
										Chính sách dữ liệu cá nhân
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-gray-300'>
										Tuân thủ và sự đồng ý của Khách Hàng
									</a>
								</li>
							</ul>
						</div>

						{/* Cột 3: Kết nối + App (Gộp chung để layout giống hình) */}
						<div className='lg:col-span-2'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
								{/* Kết nối */}
								<div>
									<h4 className='font-bold text-lg mb-4'>
										Kết nối với chúng tôi
									</h4>
									<div className='flex gap-3 text-3xl'>
										{/* Các icon MXH */}
										<a
											href='#'
											className='bg-white text-[#351e5e] rounded-full p-1 h-10 w-10 flex items-center justify-center'
										>
											<FacebookFilled />
										</a>
										<a
											href='#'
											className='bg-white text-[#351e5e] rounded-full p-1 h-10 w-10 flex items-center justify-center text-xl font-bold'
										>
											Z
										</a>{' '}
										{/* Zalo giả lập */}
										<a
											href='#'
											className='bg-white text-[#351e5e] rounded-full p-1 h-10 w-10 flex items-center justify-center'
										>
											<YoutubeFilled />
										</a>
										<a
											href='#'
											className='bg-white text-[#351e5e] rounded-full p-1 h-10 w-10 flex items-center justify-center'
										>
											<LinkedinFilled />
										</a>
									</div>
								</div>

								{/* Tải ứng dụng */}
								<div>
									<h4 className='font-bold text-lg mb-4'>
										Tải ứng dụng trên điện thoại
									</h4>
									<div className='flex gap-3'>
										{/* QR Code giả */}
										<div className='w-24 h-24 bg-white p-1 rounded'>
											<img
												src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Vieclam24h'
												alt='QR Code'
												className='w-full h-full'
											/>
										</div>
										{/* Buttons Store */}
										<div className='flex flex-col gap-2 justify-center'>
											<img
												src='https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg'
												alt='Google Play'
												className='h-10 cursor-pointer'
											/>
											<img
												src='https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg'
												alt='App Store'
												className='h-10 cursor-pointer'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* --- BOTTOM BAR --- */}
					<div className='border-t border-purple-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4'>
						<div className='flex items-center gap-2'>
							{/* Logo SieuViet giả lập bằng text hoặc thay bằng ảnh */}
							<span className='font-bold text-2xl tracking-tighter'>
								<span className='font-light'>CV</span>24h
							</span>
						</div>
						<div className='text-gray-400 text-sm'>
							© 2026 - Bản quyền thuộc về CV24h
						</div>
					</div>
				</Container>
			</footer>
		</>
	);
};

export default Footer;
