import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { JobsApi } from '../../../../../service/Api/Job/Job';
import type { IJob } from '../../../../../types/TypeJob';
import { formatSalary } from '../../../../../shared/utils/formatSalary';
import {
	Button,
	Input,
	Select,
	Avatar,
	Tag,
	TreeSelect,
	Pagination,
	Empty,
	type SelectProps,
	type TreeSelectProps,
} from 'antd';
import {
	SearchOutlined,
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

// Tạo danh sách dài hơn (50 jobs) để test phân trang

const { SHOW_PARENT } = TreeSelect;

const { Option } = Select;


// --- Sub-Components ---
const JobCard: React.FC<{ job: IJob }> = ({ job }) => {
	const navigate = useNavigate();
	const [liked, setLiked] = useState(false);

	return (
		<div
			onClick={() => navigate(`/ca/job/${job.id}`)}
			className='bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group relative mb-3'
		>
			<div className='flex gap-4'>
				<div className='flex-shrink-0'>
					<Avatar
						shape='square'
						size={64}
						src={job.company?.logoUrl}
						className='bg-gray-100 text-purple-700 font-bold text-2xl border border-gray-100'
					>
						{!job.company?.logoUrl && job.company?.name?.charAt(0)}
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
						{job.company?.name || 'Đang cập nhật'}
					</div>
					<div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
						<Tag
							color='default'
							className='border-none bg-gray-100 text-gray-600 flex items-center gap-1 px-2 py-1 rounded'
						>
							<DollarOutlined className='text-gray-400' />{' '}
							{formatSalary(job.minSalary, job.maxSalary)}
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
					{job.status === 'HOT' && (
						<ThunderboltFilled style={{ fontSize: '18px', color: '#8b5cf6' }} />
					)}
				</div>
				<div className='text-gray-400 text-xs flex items-center gap-1'>
					<ClockCircleOutlined /> Đăng lúc{' '}
					{new Date(job.createAt).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};

// --- Main Page Component ---

const JobList: React.FC = () => {
	const [searchParams] = useSearchParams();
	const [professions, setProfessions] = useState<string[]>([]);
	const [place, setPlace] = useState<string | undefined>(undefined);
	const [jobTitleValue, setJobTitleValue] = useState<string>('');
	const [sortBy, setSortBy] = useState<string>('relevant');
	const [professionOptions, setProfessionOptions] = useState<
		TreeSelectProps['treeData']
	>([]);
	const [placeOptions, setPlaceOptions] = useState<
		{ label: string; value: string }[]
	>([]);
	const [allJobs, setAllJobs] = useState<IJob[]>([]);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await JobsApi();
				if (response.result) {
					const jobsData: IJob[] = response.result;
					setAllJobs(jobsData);

					// Extract unique categories
					const uniqueCategories = [
						...new Set(jobsData.map((job) => job.category).filter(Boolean)),
					] as string[];
					const categoryOptions = uniqueCategories.map((cat) => ({
						title: cat,
						value: cat,
						key: cat,
					}));
					setProfessionOptions(categoryOptions);

					// Extract unique locations
					const uniqueLocations = [
						...new Set(jobsData.map((job) => job.location).filter(Boolean)),
					] as string[];
					const locationOptions = uniqueLocations.map((loc) => ({
						label: loc,
						value: loc,
					}));
					setPlaceOptions(locationOptions);

					// Initialize filters from searchParams
					const title = searchParams.get('title');
					const location = searchParams.get('location');
					const categories = searchParams.get('categories');

					if (title) setJobTitleValue(title);
					if (location) setPlace(location);
					if (categories) setProfessions(categories.split(','));
				}
			} catch (error) {
				console.error('Error fetching jobs:', error);
			}
		};

		fetchJobs();
	}, [searchParams]);

	// State cho Phân trang
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;

	// Logic tính toán job hiển thị
	const filteredJobs = useMemo(() => {
		const filtered = allJobs.filter((job) => {
			const matchesTitle = job.title
				.toLowerCase()
				.includes(jobTitleValue.toLowerCase());
			const matchesPlace = place ? job.location === place : true;
			const matchesCategory =
				professions.length > 0 ? professions.includes(job.category) : true;
			return matchesTitle && matchesPlace && matchesCategory;
		});

		// Apply sorting
		return [...filtered].sort((a, b) => {
			if (sortBy === 'newest') {
				return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
			}
			if (sortBy === 'salary') {
				return b.maxSalary - a.maxSalary;
			}
			// 'relevant' or default: can stay as is or add more logic
			return 0;
		});
	}, [allJobs, jobTitleValue, place, professions, sortBy]);

	const suggestedJobs = useMemo(() => {
		// Logic: Lấy các công việc HOT lên đầu, sau đó là mới nhất
		return [...allJobs]
			.sort((a, b) => {
				if (a.status === 'HOT' && b.status !== 'HOT') return -1;
				if (a.status !== 'HOT' && b.status === 'HOT') return 1;
				return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
			})
			.slice(0, 5);
	}, [allJobs]);

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const displayedJobs = filteredJobs.slice(startIndex, endIndex);

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

	const tProps: TreeSelectProps = {
		treeData: professionOptions,
		value: professions,
		onChange: onChangeProfessions,
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: 'Chọn ngành nghề',
		allowClear: true,
		style: { width: '100%' },
	};

	const sProps: SelectProps = {
		showSearch: true,
		optionFilterProp: 'label',
		onSearch: onSearchPlace,
		placeholder: 'Chọn địa điểm làm việc',
		onChange: onChangePlace,
		value: place,
		allowClear: true,
		options: placeOptions,
		style: { width: '100%' },
	};
	const handleClearFilters = () => {
		setJobTitleValue('');
		setProfessions([]);
		setPlace(undefined);
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
								value={jobTitleValue}
								onChange={(e) => setJobTitleValue(e.target.value)}
								className='py-2 font-semibold text-[16px]'
							/>
						</div>
						<div className='w-px h-6 bg-gray-200 hidden md:block'></div>
						<div className='w-full md:w-65'>
							<TreeSelect
								className='text-[14px]! font-medium'
								{...tProps}
								bordered={false}
							/>
						</div>
						<div className='w-px h-6 bg-gray-200 hidden md:block'></div>
						<div className='w-full md:w-65'>
							<Select
								className='text-[14px]! font-medium'
								{...sProps}
								bordered={false}
							/>
						</div>
						<div className='flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0'>
							<Button
								type='primary'
								className='bg-[#451fa3]! font-semibold! hover:bg-[#2f0d7b]! h-10 px-8 flex-1 md:flex-none rounded border-none'
							>
								Tìm kiếm
							</Button>
							<Button
								icon={<CloseOutlined />}
								onClick={handleClearFilters}
								className='h-10 text-gray-500! hover:text-[#451fa3]! border-gray-200! rounded'
							>
								Xoá lọc
							</Button>
						</div>
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
							<span className='text-purple-700'>{filteredJobs.length}</span>{' '}
							việc làm mới nhất
						</h1>
					</div>

					{/* Sort Bar */}
					<div className='flex justify-end mb-4'>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<span>Sắp xếp:</span>
							<Select
								value={sortBy}
								onChange={(value) => setSortBy(value)}
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
					<div className='space-y-4'>
						{displayedJobs.length > 0 ? (
							displayedJobs.map((job) => <JobCard key={job.id} job={job} />)
						) : (
							<div className='flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-gray-200'>
								<Empty
									description={
										<div className='text-gray-500'>
											<p className='text-lg font-semibold'>
												Không tìm thấy việc làm phù hợp
											</p>
											<p>Vui lòng thử lại với các từ khoá hoặc bộ lọc khác</p>
										</div>
									}
								/>
							</div>
						)}
					</div>

					{/* Pagination */}
					<div className='mt-6 flex justify-center'>
						<Pagination
							current={currentPage}
							total={filteredJobs.length}
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
						{/* <button className='mt-4 w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
							<img src={googleIcon} className='w-6' alt='google icon' />
							<div className='flex-1'>
								<p className='text-[14px] font-medium'>Đăng nhập với Google</p>
							</div>
						</button> */}
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
											{formatSalary(item.minSalary, item.maxSalary)}
										</span>
										<span className='text-gray-300'>|</span>
										<span>{item.location}</span>
									</div>
									<div className='text-[11px] text-gray-400 flex items-center gap-1'>
										<ClockCircleOutlined />{' '}
										{new Date(item.createAt).toLocaleDateString()}
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
