import Container from '../../../../../shared/components/Container';

const InfoSection = () => {
	const features = [
		{
			icon: '⏳', // Bạn có thể thay bằng thẻ <img> hoặc SVG
			title: 'Nguồn ứng viên chất lượng',
			description: (
				<>
					Nhà tuyển dụng có thể tiếp cận nguồn ứng viên dồi dào với hơn{' '}
					<span className='font-bold'>10 triệu hồ sơ</span> và hơn{' '}
					<span className='font-bold'>50 triệu lượt truy cập</span> mỗi năm
				</>
			),
		},
		{
			icon: '💎',
			title: 'Trải nghiệm toàn diện',
			description:
				'Tài khoản nhà tuyển dụng được tích hợp thêm các tính năng thông minh, giúp thuận tiện quản lý tin đăng, quản lý hồ sơ và theo dõi ứng viên, và lượng nộp đơn',
		},
		{
			icon: '▤',
			title: 'Chi phí hợp lý',
			description: (
				<>
					Đặc quyền <span className='font-bold'>12++ tin đăng miễn phí</span>{' '}
					mỗi năm giúp nhà tuyển dụng tối ưu chi phí & quy trình tuyển dụng
				</>
			),
		},
		{
			icon: '📞',
			title: 'Chất lượng CSKH chuyên nghiệp',
			description:
				'Đội ngũ CSKH giờ tập trung cho vieclam24h.vn, chuyên nghiệp hơn & tận tình hơn, nhằm mang lại trải nghiệm tốt nhất và hiệu quả tối đa',
		},
	];

	return (
		<Container>
			{/* Tiêu đề chính */}
			<div className='text-center mb-16'>
				<div className='w-12 h-1 bg-blue-500 mx-auto mb-6'></div>
				<h2 className='text-2xl md:text-3xl font-bold leading-tight'>
					CV24h - website việc làm phổ biến nhất Việt Nam{' '}
					<br className='hidden md:block' />
					với gần 20 năm kinh nghiệm trên thị trường
				</h2>
			</div>

			{/* Lưới nội dung */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10'>
				{features.map((item, index) => (
					<div key={index} className='flex gap-4'>
						<div className='text-4xl min-w-[50px] text-blue-600'>
							{item.icon}
						</div>
						<div>
							<h3 className='text-xl font-bold mb-2'>{item.title}</h3>
							<p className='text-gray-600 text-sm md:text-base leading-relaxed'>
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Nút kêu gọi hành động */}
			<div className='text-center mt-16'>
				<h3 className='text-xl font-bold mb-6'>
					Trải nghiệm dịch vụ đăng tin tại Việc Làm 24h
				</h3>
				<button className=' px-20 py-4 text-white cursor-pointer bg-[#5932bc] hover:bg-[#2f0d7b]  border-none rounded text-base font-medium shadow-lg transition du'>
					Đăng tin ngay!
				</button>
			</div>
		</Container>
	);
};

export default InfoSection;
