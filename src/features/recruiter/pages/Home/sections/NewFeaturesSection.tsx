import React from 'react';
import Container from '../../../../../shared/components/Container';

const NewFeaturesSection = () => {
	const cards = [
		{
			title: 'Quản lý đăng tuyển',
			desc: 'Với thư viện chuẩn của hơn 1000+ mô tả công việc gợi ý cho nhà tuyển dụng với các ngành nghề và vị trí khác nhau',
			iconColor: 'text-blue-500',
		},
		{
			title: 'Quản lý ứng viên',
			desc: 'Với công cụ quản lý tích hợp, báo cáo trực quan, dễ sử dụng và theo dõi kho hồ sơ ứng viên theo từng vị trí đăng tuyển',
			iconColor: 'text-teal-400',
		},
		{
			title: 'Quảng cáo đa nền tảng',
			desc: 'Với cơ chế đẩy tin lên các vị trí đầu trang kết quả tìm kiếm việc làm và kết hợp nguồn tiếp cận thông qua các kênh truyền thông mạng xã hội Facebook, Tiktok',
			iconColor: 'text-purple-600',
		},
	];

	return (
		<section className='bg-[#f0f4f8] py-16 px-4 mt-10'>
			<Container>
				{/* Phần giới thiệu phiên bản */}
				<div className='flex flex-col md:flex-row items-center justify-center gap-8 mb-16'>
					<div className='relative'>
						{/* Vòng tròn trang trí phía sau */}
						<div className='absolute -right-4 top-0 w-full h-full border-r-2 border-dashed border-purple-300 rounded-full'></div>
						{/* Ảnh đại diện */}
						<div className='w-48 h-48 rounded-full border-8 border-white overflow-hidden shadow-lg z-10 relative'>
							<img
								src='https://img.freepik.com/free-photo/young-asia-businessman-using-laptop-computer-work-project-brainstorming-meeting-office-room_7861-3091.jpg'
								alt='User profile'
								className='w-full h-full object-cover'
							/>
						</div>
					</div>

					<h2 className='text-2xl md:text-4xl font-bold text-center md:text-left max-w-lg leading-tight'>
						Phiên bản 2026 giúp đăng tuyển nhanh chóng và hiệu quả hơn
					</h2>
				</div>

				{/* Lưới 3 thẻ */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{cards.map((card, index) => (
						<div
							key={index}
							className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center'
						>
							{/* Icon giả lập từ ký tự quote */}
							<div className={`text-4xl font-serif mb-4 ${card.iconColor}`}>
								❝ ❞
							</div>
							<h3 className='text-[#4a24b0] text-xl font-bold mb-4'>
								{card.title}
							</h3>
							<p className='text-gray-600 text-sm leading-relaxed'>
								{card.desc}
							</p>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
};

export default NewFeaturesSection;
