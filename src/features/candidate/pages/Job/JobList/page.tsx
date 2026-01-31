import React, { useState } from 'react';
import {
	Button,
	Input,
	Select,
	Avatar,
	Tag,
	TreeSelect,
	Pagination,
	Divider,
} from 'antd';
import {
	SearchOutlined,
	FilterOutlined,
	EnvironmentOutlined,
	DollarOutlined,
	HeartOutlined,
	HeartFilled,
	ClockCircleOutlined,
	ThunderboltFilled,
	CloseOutlined,
	FireOutlined,
	RightOutlined,
} from '@ant-design/icons';
import Container from '../../../../../shared/components/Container';
import googleIcon from '../../../../../assets/icons/googleIcon.png';

// --- Types & Mock Data ---

interface Job {
	id: number;
	title: string;
	company: string;
	salary: string;
	location: string;
	daysLeft: number;
	logo: string;
	isHot?: boolean;
}

const baseJobs: Job[] = [
	{
		id: 1,
		title: 'Thực Tập Sinh Đi Làm Sau Tết',
		company:
			'Công Ty Cổ Phần Bất Động Sản Xây Dựng Trang Trí Nội Thất Vương Điền Group',
		salary: '1 - 100 triệu',
		location: 'TP.HCM',
		daysLeft: 31,
		logo: 'V',
		isHot: true,
	},
	{
		id: 2,
		title: 'Kỹ Sư Phòng Kinh Tế - Kế Hoạch - Đi Làm Sau Tết',
		company: 'Công Ty Cổ Phần Đầu Tư Và Xây Dựng Maxline',
		salary: '13 - 20 triệu',
		location: 'Hà Nội',
		daysLeft: 36,
		logo: 'M',
		isHot: true,
	},
	{
		id: 3,
		title: 'Kỹ Sư Xây Dựng - Đi Làm Sau Tết',
		company: 'Công Ty Cổ Phần Đầu Tư Và Xây Dựng Maxline',
		salary: '15 - 25 triệu',
		location: 'Hà Nội',
		daysLeft: 36,
		logo: 'M',
		isHot: true,
	},
	{
		id: 4,
		title: 'Nhân Viên Bán Hàng - Quầy Dịch Vụ Bách Hoá Lưu Niệm',
		company:
			'Chi Nhánh Tại Thành Phố Hồ Chí Minh - Công Ty CP Dịch Vụ Hàng Không Bầu Trời Xanh',
		salary: '8.8 - 10 triệu',
		location: 'TP.HCM',
		daysLeft: 28,
		logo: 'B',
		isHot: false,
	},
	{
		id: 5,
		title: 'Nhân Viên Kinh Doanh - Thu Nhập 10 - 30 Triệu',
		company: 'Công Ty TNHH Sản Xuất Tùng Khánh',
		salary: '10 - 30 triệu',
		location: 'Hà Nội',
		daysLeft: 30,
		logo: 'T',
		isHot: false,
	},
];

// Mock Data cho việc làm gợi ý (Sidebar)
const suggestedJobs = [
	{
		id: 101,
		title: 'Trưởng Phòng Kinh Doanh',
		salary: '20 - 30 triệu',
		location: 'Hà Nội',
		time: '1 giờ trước',
	},
	{
		id: 102,
		title: 'Nhân Viên Marketing Online',
		salary: '10 - 15 triệu',
		location: 'TP.HCM',
		time: '2 giờ trước',
	},
	{
		id: 103,
		title: 'Kế Toán Tổng Hợp',
		salary: '12 - 18 triệu',
		location: 'Đà Nẵng',
		time: 'Vừa xong',
	},
	{
		id: 104,
		title: 'Lập Trình Viên ReactJS',
		salary: 'Up to $2000',
		location: 'Remote',
		time: '1 ngày trước',
	},
];

// Tạo danh sách dài hơn (50 jobs) để test phân trang
const mockJobs: Job[] = Array.from({ length: 50 }).map((_, index) => ({
	...baseJobs[index % baseJobs.length],
	id: index + 1,
	title: `${baseJobs[index % baseJobs.length].title} (Job #${index + 1})`,
}));

const dataSelect = {
	salary: [
		'Tất cả mức lương',
		'Dưới 1 triệu',
		'1-10 triệu',
		'10-15 triệu',
		'15-20 triệu',
		'Trên 25 triệu',
	],
	experience: [
		'Tất cả kinh nghiệm',
		'Dưới 1 năm',
		'1-2 năm',
		'2-3 năm',
		'3-5 năm',
		'5-10 năm',
		'Trên 10 năm',
	],
	rank: [
		'Tất cả cấp bậc',
		'Giám đốc',
		'Trưởng phòng',
		'Nhân viên',
		'Thực tập sinh',
		'Cộng tác viên',
	],
};

const { SHOW_PARENT } = TreeSelect;

const professionData = [
	{ title: 'IT - Phần mềm', value: '0', key: '0' },
	{ title: 'IT - Phần cứng', value: '1', key: '1' },
	{ title: 'Khách sạn - Nhà hàng - Du lịch', value: '2', key: '2' },
];
const placeData = [
	{ label: 'Hà Nội', value: 'Hà Nội' },
	{ label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
	{ label: 'Đà Nẵng', value: 'Đà Nẵng' },
];

const { Option } = Select;

// --- Sub-Components ---
const JobCard: React.FC<{ job: Job }> = ({ job }) => {
	const [liked, setLiked] = useState(false);

	return (
		<div className='bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group relative mb-3'>
			<div className='flex gap-4'>
				<div className='flex-shrink-0'>
					<Avatar
						shape='square'
						size={64}
						className='bg-gray-100 text-purple-700 font-bold text-2xl border border-gray-100'
					>
						{job.logo}
					</Avatar>
				</div>
				<div className='flex-1'>
					<div className='flex justify-between items-start'>
						<h3 className='font-bold text-gray-800 text-lg leading-tight group-hover:text-purple-700 transition-colors pr-8'>
							{job.title}
						</h3>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setLiked(!liked);
							}}
							className='text-gray-400 hover:text-red-500 transition-colors absolute top-4 right-4'
						>
							{liked ? (
								<HeartFilled className='text-red-500 text-xl' />
							) : (
								<HeartOutlined className='text-xl' />
							)}
						</button>
					</div>
					<div className='text-gray-500 text-sm mt-1 mb-2 line-clamp-1'>
						{job.company}
					</div>
					<div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
						<Tag
							color='default'
							className='border-none bg-gray-100 text-gray-600 flex items-center gap-1 px-2 py-1 rounded'
						>
							<DollarOutlined className='text-gray-400' /> {job.salary}
						</Tag>
						<Tag
							color='default'
							className='border-none bg-gray-100 text-gray-600 flex items-center gap-1 px-2 py-1 rounded'
						>
							<EnvironmentOutlined className='text-gray-400' /> {job.location}
						</Tag>
					</div>
				</div>
			</div>
			<div className='mt-2 flex justify-between items-end border-t border-dashed border-gray-100 pt-2'>
				<div className='text-purple-600'>
					{job.isHot && (
						<ThunderboltFilled style={{ fontSize: '18px', color: '#8b5cf6' }} />
					)}
				</div>
				<div className='text-gray-400 text-xs flex items-center gap-1'>
					<ClockCircleOutlined /> Còn {job.daysLeft} ngày
				</div>
			</div>
		</div>
	);
};

// --- Main Page Component ---

const JobList: React.FC = () => {
	const [professions, setProfessions] = useState<string[]>([]);
	const [place, setPlace] = useState<string>('');

	// State cho Phân trang
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;

	// Logic tính toán job hiển thị
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const displayedJobs = mockJobs.slice(startIndex, endIndex);

	// Hàm xử lý khi đổi trang
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const onChangeProfessions = (newValue: string[]) => {
		setProfessions(newValue);
	};
	const onChangePlace = (value: string) => {
		setPlace(value);
	};
	const onSearchPlace = (value: string) => {
		console.log('onSearchPlace ', value);
	};

	const tProps: any = {
		treeData: professionData,
		value: professions,
		onChange: onChangeProfessions,
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: 'Chọn ngành nghề',
		style: { width: '100%' },
	};

	const sProps: any = {
		showSearch: { optionFilterProp: 'label', onSearch: onSearchPlace },
		placeholder: 'Chọn địa điểm làm việc',
		onChange: onChangePlace,
		options: placeData,
		style: { width: '100%' },
	};

	return (
		<div className=''>
			{/* === 1. Search Section (Header) === */}
			<Container className='mt-10 mb-6 rounded-xl bg-[#ede7ff] px-4 py-6 shadow-xl'>
				<div className=''>
					<div className='bg-white p-1 rounded-md flex flex-col md:flex-row gap-2 items-center shadow-lg'>
						<div className='flex-1 w-full'>
							<Input
								prefix={<SearchOutlined className='text-gray-400' />}
								placeholder='Tìm kiếm cơ hội việc làm'
								bordered={false}
								className='py-2 font-semibold text-[16px]'
							/>
						</div>
						<div className='w-px h-6 bg-gray-200 hidden md:block'></div>
						<div className='w-full md:w-65'>
							<TreeSelect
								className='text-[14px]! font-medium'
								{...tProps}
								variant='borderless'
							/>
						</div>
						<div className='w-px h-6 bg-gray-200 hidden md:block'></div>
						<div className='w-full md:w-65'>
							<Select
								className='text-[14px]! font-medium'
								{...sProps}
								variant='borderless'
							/>
						</div>
						<Button
							type='primary'
							className='bg-[#451fa3]! font-semibold! hover:bg-[#2f0d7b]! h-10 px-8 w-full md:w-auto rounded border-none'
						>
							Tìm kiếm
						</Button>
					</div>

					<div className='mt-4 flex flex-wrap gap-3 items-center'>
						{Object.entries({
							experience: 'Tất cả kinh nghiệm',
							salary: 'Tất cả mức lương',
							rank: 'Tất cả cấp bậc',
						}).map(([key, value]) => (
							<Select
								key={key}
								defaultValue={value}
								size='middle'
								className='min-w-[140px] [&_.ant-select-selector]:!rounded-md'
								style={{ width: 160 }}
								options={dataSelect[key as keyof typeof dataSelect].map(
									(item) => ({ value: item, label: item }),
								)}
							/>
						))}
						<span className='ml-3 text-sm cursor-pointer text-[#451fa3] flex items-center font-semibold gap-1 hover:opacity-70 transition-all duration-300'>
							<span className='bg-[#451fa3] rounded-full w-4 h-4 flex items-center justify-center text-[10px] text-white'>
								<CloseOutlined />
							</span>{' '}
							Xoá lọc
						</span>
					</div>
				</div>
			</Container>

			{/* === 2. Main Body === */}
			<Container className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
				{/* --- Left Column: Job List --- */}
				<div className='lg:col-span-8 '>
					{/* Breadcrumb & Title */}
					<div className='mb-4'>
						<h1 className='text-2xl font-bold text-gray-800'>
							Tuyển dụng{' '}
							<span className='text-purple-700'>{mockJobs.length}</span> việc
							làm mới nhất
						</h1>
					</div>

					{/* Sort Bar */}
					<div className='flex justify-end mb-4'>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<span>Sắp xếp:</span>
							<Select
								defaultValue='relevant'
								size='small'
								className='w-32 border-none shadow-sm rounded'
							>
								<Option value='relevant'>Phù hợp nhất</Option>
								<Option value='newest'>Mới nhất</Option>
								<Option value='salary'>Lương cao nhất</Option>
							</Select>
						</div>
					</div>

					{/* Job Items List */}
					<div className='space-y-3'>
						{displayedJobs.map((job) => (
							<JobCard key={job.id} job={job} />
						))}
					</div>

					{/* Pagination */}
					<div className='mt-6 flex justify-center'>
						<Pagination
							current={currentPage}
							total={mockJobs.length}
							pageSize={pageSize}
							onChange={handlePageChange}
							showSizeChanger={false}
							className='[&_.ant-pagination-item-active]:!bg-purple-700 [&_.ant-pagination-item-active]:!border-purple-700 [&_.ant-pagination-item-active_a]:!text-white'
						/>
					</div>
				</div>

				{/* --- Right Column: Sidebar --- */}
				<div className='lg:col-span-4 space-y-6'>
					{/* 1. Login Box (Giữ nguyên) */}
					<div className='bg-white p-6 rounded-lg shadow-sm border border-purple-100'>
						<h3 className='font-bold text-purple-900 text-lg mb-2'>
							Đăng nhập để lưu việc và theo dõi phản hồi
						</h3>
						<p className='text-gray-600 text-sm mb-4'>
							Nhận gợi ý việc làm theo vị trí, hồ sơ...
						</p>
						<Button
							type='primary'
							block
							className='bg-[#451fa3]! hover:!bg-[#2f0d7b]! h-10 font-semibold! mb-3'
						>
							Đăng nhập
						</Button>
						<button className='mt-4 w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
							<img src={googleIcon} className='w-6' alt='google icon' />
							<div className='flex-1'>
								<p className='text-[14px] font-medium'>Đăng nhập với Google</p>
							</div>
						</button>
					</div>

					{/* 2. New Suggestion Box (Phần Mới Thêm) */}
					<div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
						<div className='bg-gradient-to-r from-purple-50 to-white p-4 border-b border-gray-100'>
							<h3 className='font-bold text-gray-800 flex items-center gap-2'>
								<FireOutlined className='text-red-500' />
								Việc làm gợi ý cho bạn
							</h3>
						</div>

						<div className='p-2'>
							{suggestedJobs.map((item, idx) => (
								<div
									key={item.id}
									className={`p-3 hover:bg-purple-50 rounded-md cursor-pointer transition-colors group ${idx !== suggestedJobs.length - 1 ? 'border-b border-gray-50' : ''}`}
								>
									<div className='font-semibold text-gray-800 text-[15px] mb-1 group-hover:text-[#451fa3] line-clamp-2'>
										{item.title}
									</div>
									<div className='flex items-center gap-2 text-xs text-gray-500 mb-2'>
										<span className='font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100'>
											{item.salary}
										</span>
										<span className='text-gray-300'>|</span>
										<span>{item.location}</span>
									</div>
									<div className='text-[11px] text-gray-400 flex items-center gap-1'>
										<ClockCircleOutlined /> {item.time}
									</div>
								</div>
							))}
						</div>

						<div className='p-3 border-t border-gray-100 text-center'>
							<a
								href='#'
								className='text-[#451fa3] font-semibold text-sm hover:underline flex items-center justify-center gap-1'
							>
								Xem tất cả gợi ý <RightOutlined className='text-xs' />
							</a>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default JobList;
