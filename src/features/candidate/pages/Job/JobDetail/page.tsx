import React from 'react';
import { Button, Tag, Avatar, Divider, Typography } from 'antd';
import {
	DollarOutlined,
	EnvironmentOutlined,
	ClockCircleOutlined,
	TrophyOutlined,
	HeartOutlined,
	SendOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import Container from '../../../../../shared/components/Container';

const { Title } = Typography;

// --- Mock Data (Dữ liệu giả lập từ ảnh của bạn) ---
const jobData = {
	title: 'Chuyên Viên Tiền Lương Và Phúc Lợi',
	salary: '12 - 18 triệu',
	location: 'TP.HCM',
	experience: '2 năm',
	level: 'Cao đẳng',
	deadline: '28/02/2026',
	companyName: 'Công Ty TNHH Baoz Group',
	companyAddress: '82-88 Nguyễn Tri Phương, Phường An Đông, Quận 5',
	companySize: '150 - 300 nhân viên',
	sections: [
		{
			title: 'Mô tả công việc',
			content: [
				{
					subTitle: 'A. Tính và chi trả lương',
					items: [
						'Kiểm tra ngày giờ công và thực hiện tính lương hàng tháng cho nhân viên.',
						'Đảm bảo tính đúng theo quy định pháp luật và quy chế lương của công ty.',
					],
				},
				{
					subTitle: 'B. Thuế Thu nhập cá nhân (chuyên sâu)',
					items: [
						'Thực hiện khấu trừ thuế TNCN hàng tháng...',
						'Kiểm tra và quyết toán Thuế TNCN năm cho người lao động.',
					],
				},
				// ... thêm các mục khác tương tự
			],
		},
		{
			title: 'Yêu cầu công việc',
			items: [
				'Tối thiểu 02 năm kinh nghiệm C&B, ưu tiên ngành F&B/nhà hàng/khách sạn.',
				'Thành thạo tính lương từ 300 nhân sự trở lên.',
				'Chuyên sâu Thuế Thu nhập cá nhân & Quyết toán thuế TNCN.',
				'Sử dụng tốt Excel.',
				'Hiểu rõ Luật lao động, Thuế TNCN, BHXH...',
			],
		},
		{
			title: 'Quyền lợi',
			items: [
				'Môi trường làm việc thân thiện, năng động.',
				'Quà vào các dịp Lễ, Tết (Trung thu, 8/3, 20/10...)',
				'Chính sách ưu đãi cho nhân viên (sinh nhật, dùng bữa cùng người thân...)',
				'Du lịch thường niên (tối thiểu 2 ngày 1 đêm).',
			],
		},
	],
	generalInfo: [
		{ label: 'Ngày đăng', value: '23/01/2026' },
		{ label: 'Thời gian thử việc', value: '2 tháng' },
		{ label: 'Cấp bậc', value: 'Nhân viên' },
		{ label: 'Số lượng tuyển', value: '2' },
		{ label: 'Hình thức làm việc', value: 'Toàn thời gian cố định' },
		{ label: 'Yêu cầu bằng cấp', value: 'Cao đẳng' },
		{ label: 'Yêu cầu kinh nghiệm', value: '2 năm' },
		{ label: 'Ngành nghề', value: 'Hành chính - Thư ký / Nhân sự / Kế toán' },
	],
	skills: [
		'Tính lương',
		'Thuế TNCN',
		'Chính sách phúc lợi',
		'Báo cáo nhân sự',
		'Excel',
	],
	keywords: [
		'chuyên viên lao động tiền lương',
		'Tiền Lương',
		'nhân sự tiền lương',
		'kế toán tiền lương',
		'việc làm TP.HCM',
	],
};

const similarJobs = [
	{
		title: 'Thực Tập Sinh Phúc Lợi',
		company: 'Công Ty TNHH Giải Pháp Tốt - Gft',
		salary: '2 - 3 triệu',
		location: 'TP.HCM',
		daysLeft: 17,
	},
	{
		title: 'Chuyên Viên Nhân Sự Tiền Lương',
		company: 'Công Ty TNHH Đầu Tư Ntt Việt Nam',
		salary: '10 - 13 triệu',
		location: 'TP.HCM',
		daysLeft: 32,
	},
];

// --- Component Chính ---
const JobDetail: React.FC = () => {
	return (
		<div className='mt-10'>
			<Container>
				{/* === Header Section === */}
				<div className='bg-white rounded-lg shadow-xl p-6 mb-6'>
					<Title level={3} className='!mb-4 text-gray-800'>
						{jobData.title}
					</Title>

					<div className='flex flex-wrap gap-6 mb-6 text-gray-600'>
						<div className='flex items-center gap-2'>
							<div className='p-2 bg-purple-50 rounded-full text-purple-600'>
								<DollarOutlined />
							</div>
							<div>
								<div className='text-xs text-gray-500'>Mức lương</div>
								<div className='font-semibold text-purple-700'>
									{jobData.salary}
								</div>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<div className='p-2 bg-purple-50 rounded-full text-purple-600'>
								<EnvironmentOutlined />
							</div>
							<div>
								<div className='text-xs text-gray-500'>Khu vực tuyển</div>
								<div className='font-semibold text-gray-800'>
									{jobData.location}
								</div>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<div className='p-2 bg-purple-50 rounded-full text-purple-600'>
								<ClockCircleOutlined />
							</div>
							<div>
								<div className='text-xs text-gray-500'>Kinh nghiệm</div>
								<div className='font-semibold text-gray-800'>
									{jobData.experience}
								</div>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<div className='p-2 bg-purple-50 rounded-full text-purple-600'>
								<TrophyOutlined />
							</div>
							<div>
								<div className='text-xs text-gray-500'>Trình độ</div>
								<div className='font-semibold text-gray-800'>
									{jobData.level}
								</div>
							</div>
						</div>
					</div>

					<div className='flex items-center justify-between bg-orange-50 p-3 rounded mb-6 border border-orange-100'>
						<span className='text-orange-600 text-sm'>
							⏳ Hạn nộp hồ sơ: <strong>{jobData.deadline}</strong> • Công việc
							đang rất được quan tâm! Ứng tuyển ngay để không lỡ cơ hội!
						</span>
					</div>

					<div className='flex gap-4'>
						<Button
							type='primary'
							size='large'
							icon={<SendOutlined />}
							className='flex-1 bg-[#451fa3]! hover:!bg-[#2f0d7b] h-12 font-bold text-lg'
						>
							Ứng tuyển ngay
						</Button>
						<Button
							size='large'
							icon={<HeartOutlined />}
							className='text-[#451fa3] border-[#451fa3] h-12 hover:!text-[#2f0d7b] hover:!border-[#2f0d7b]'
						>
							Lưu công việc này
						</Button>
					</div>
				</div>

				{/* === Main Layout: 2 Columns === */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* --- LEFT COLUMN: Content --- */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Job Description Block */}
						<div className='bg-white rounded-lg shadow-sm p-6'>
							<Title
								level={4}
								className='border-l-4 border-purple-600 pl-3 mb-6'
							>
								Mô tả công việc
							</Title>

							{/* Render dynamic sections */}
							{jobData.sections.map((section, idx) => (
								<div key={idx} className='mb-6'>
									{/* Chỉ hiển thị title con nếu có trong data (như phần A, B, C, D) */}
									{section.title !== 'Mô tả công việc' && (
										<h3 className='font-bold text-gray-800 mb-2'>
											{section.title}
										</h3>
									)}

									{section.content ? (
										// Trường hợp có sub-title (A. Tính lương...)
										section.content.map((sub, sIdx) => (
											<div key={sIdx} className='mb-4'>
												<div className='font-semibold text-gray-800'>
													{sub.subTitle}
												</div>
												<ul className='list-disc list-inside text-gray-600 pl-2 space-y-1 mt-1'>
													{sub.items.map((item, i) => (
														<li key={i}>{item}</li>
													))}
												</ul>
											</div>
										))
									) : (
										// Trường hợp list thường (Yêu cầu, Quyền lợi)
										<ul className='list-disc list-inside text-gray-600 pl-2 space-y-1'>
											{section.items?.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>

						{/* General Info Block */}
						<div className='bg-white rounded-lg shadow-sm p-6'>
							<Title
								level={4}
								className='border-l-4 border-purple-600 pl-3 mb-6'
							>
								Thông tin chung
							</Title>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4'>
								{jobData.generalInfo.map((info, idx) => (
									<div key={idx}>
										<div className='text-gray-500 text-sm mb-1'>
											{info.label}
										</div>
										<div className='font-medium text-gray-800'>
											{info.value}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Location & Skills Block */}
						<div className='bg-white rounded-lg shadow-sm p-6'>
							<div className='mb-6'>
								<Title level={4} className='mb-4'>
									Kỹ năng cần thiết
								</Title>
								<div className='flex flex-wrap gap-2'>
									{jobData.skills.map((skill) => (
										<span
											key={skill}
											className='text-gray-700 bg-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-200 cursor-default transition'
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							<Divider />

							<div className='mb-6'>
								<Title level={4} className='mb-4'>
									Địa điểm làm việc
								</Title>
								<div className='flex items-start gap-2 text-gray-700'>
									<EnvironmentOutlined className='mt-1 text-purple-600' />
									<span>{jobData.companyAddress}</span>
								</div>
							</div>

							<div className='mb-6'>
								<Title
									level={5}
									className='mb-3 text-sm text-gray-500 font-normal'
								>
									Từ khoá
								</Title>
								<div className='flex flex-wrap gap-2'>
									{jobData.keywords.map((kw) => (
										<Tag
											key={kw}
											className='bg-gray-100 border-none text-gray-600 px-3 py-1 rounded-md m-0'
										>
											{kw}
										</Tag>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* --- RIGHT COLUMN: Sidebar --- */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Company Info Card */}
						<div className='bg-white rounded-lg shadow-sm p-6 border-t-4 border-yellow-400'>
							<div className='flex flex-col items-center text-center mb-4'>
								<Avatar
									size={80}
									className='bg-yellow-400 mb-3 text-2xl font-bold'
								>
									BAOZ
								</Avatar>
								<h3 className='font-bold text-lg text-gray-800'>
									{jobData.companyName}
								</h3>
							</div>

							<div className='space-y-3 text-sm text-gray-600'>
								<div className='flex gap-2'>
									<EnvironmentOutlined className='text-gray-400 mt-1' />
									<span>{jobData.companyAddress}</span>
								</div>
								<div className='flex gap-2'>
									<TeamOutlined className='text-gray-400 mt-1' />
									<span>Quy mô: {jobData.companySize}</span>
								</div>
							</div>

							<div className='mt-4 text-center'>
								<a href='#' className='text-blue-600 hover:underline'>
									Xem trang công ty →
								</a>
							</div>
						</div>

						{/* Similar Jobs */}
						<div className='bg-white rounded-lg shadow-sm p-4'>
							<h4 className='font-bold text-gray-700 mb-4'>
								Việc làm tương tự cho bạn
							</h4>
							<div className='space-y-4'>
								{similarJobs.map((job, idx) => (
									<div
										key={idx}
										className='border border-gray-100 rounded p-3 hover:shadow-md transition bg-white cursor-pointer group'
									>
										<h5 className='font-semibold text-gray-800 group-hover:text-purple-700 transition line-clamp-2'>
											{job.title}
										</h5>
										<div className='text-gray-500 text-sm mt-1'>
											{job.company}
										</div>
										<div className='flex items-center gap-2 mt-2 text-sm'>
											<span className='text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded-full'>
												{job.salary}
											</span>
											<span className='text-gray-400'>•</span>
											<span className='text-gray-500'>{job.location}</span>
										</div>
										<div className='mt-2 text-xs text-gray-400 flex items-center gap-1'>
											<ClockCircleOutlined /> Còn {job.daysLeft} ngày
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default JobDetail;
