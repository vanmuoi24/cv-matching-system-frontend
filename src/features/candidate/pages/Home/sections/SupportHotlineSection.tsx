import { CustomerServiceOutlined } from '@ant-design/icons';

const SupportHotlineSection = () => {
	return (
		<div className='bg-white py-10 border-t border-gray-100'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex flex-col md:flex-row'>
					{/* --- CỘT TRÁI: NGƯỜI TÌM VIỆC --- */}
					<div className='flex-1 flex flex-col items-center text-center px-4 mb-8 md:mb-0 md:border-r border-gray-200'>
						<h3 className='text-[#361d5e] font-bold text-xl mb-6'>
							Hotline cho Người tìm việc
						</h3>

						<div className='flex flex-col md:flex-row gap-8 mb-6'>
							{/* Miền Nam */}
							<div>
								<div className='flex items-center justify-center gap-2 text-gray-500 mb-1'>
									<CustomerServiceOutlined />{' '}
									<span>Hotline hỗ trợ miền Nam</span>
								</div>
								<div className='text-[#361d5e] font-bold text-lg'>
									HCM: (028) 7109 2424
								</div>
							</div>

							{/* Miền Bắc */}
							<div>
								<div className='flex items-center justify-center gap-2 text-gray-500 mb-1'>
									<CustomerServiceOutlined />{' '}
									<span>Hotline hỗ trợ miền Bắc</span>
								</div>
								<div className='text-[#361d5e] font-bold text-lg'>
									HN: (024) 7309 2424
								</div>
							</div>
						</div>

						<button className='px-6 py-2 border border-[#361d5e] text-[#361d5e] font-medium rounded hover:bg-[#361d5e] hover:text-white transition-colors duration-300'>
							Tư vấn cho Người tìm việc
						</button>
					</div>

					{/* --- CỘT PHẢI: NHÀ TUYỂN DỤNG --- */}
					<div className='flex-1 flex flex-col items-center text-center px-4'>
						<h3 className='text-blue-600 font-bold text-xl mb-6'>
							Hotline cho Nhà tuyển dụng
						</h3>

						<div className='flex flex-col md:flex-row gap-8 mb-6'>
							{/* Miền Nam */}
							<div>
								<div className='flex items-center justify-center gap-2 text-blue-400 mb-1'>
									<CustomerServiceOutlined />{' '}
									<span>Hotline hỗ trợ miền Nam</span>
								</div>
								<div className='text-blue-500 font-bold text-lg'>
									HCM: (028) 7108 2424
								</div>
							</div>

							{/* Miền Bắc */}
							<div>
								<div className='flex items-center justify-center gap-2 text-blue-400 mb-1'>
									<CustomerServiceOutlined />{' '}
									<span>Hotline hỗ trợ miền Bắc</span>
								</div>
								<div className='text-blue-500 font-bold text-lg'>
									HN: (024) 7308 2424
								</div>
							</div>
						</div>

						<button className='px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded hover:bg-blue-500 hover:text-white transition-colors duration-300'>
							Tư vấn cho Nhà tuyển dụng
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SupportHotlineSection;
