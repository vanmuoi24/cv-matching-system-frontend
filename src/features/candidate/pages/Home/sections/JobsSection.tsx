import { Pagination, Select, type SelectProps, Empty } from 'antd';
import fireIcon from '../../../../../assets/icons/fireIcon.png';
import Container from '../../../../../shared/components/Container';
import { Funnel } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import FilterScrollMenu from '../../../components/FilterScrollMenu/FilterScrollMenu';
import JobCard from '../../../components/Card/JobCard';
import { JobsApi } from '../../../../../service/Api/Job/Job';
import { type IJob } from '../../../../../types/TypeJob';

const JobSection = () => {
	const [filterValue, setFilterValue] = useState<
		'place' | 'profession' | 'salary'
	>('place');

	const [jobs, setJobs] = useState<IJob[]>([]);
	const [activeTab, setActiveTab] = useState('Tất cả');
	const [dynamicOptions, setDynamicOptions] = useState<
		Record<string, string[]>
	>({
		place: ['Tất cả'],
		profession: ['Tất cả'],
		salary: [
			'Tất cả',
			'Dưới 500$',
			'500-1,000$',
			'1,000-2,000$',
			'Trên 2,000$',
		],
	});

	useEffect(() => {
		const getJobs = async () => {
			try {
				const response = await JobsApi();
				if (response.code === 1000 && response.result) {
					const data: IJob[] = response.result;
					setJobs(data);

					// Dynamic options
					const places = [
						'Tất cả',
						...new Set(data.map((j) => j.location).filter(Boolean)),
					] as string[];
					const professions = [
						'Tất cả',
						...new Set(data.map((j) => j.category).filter(Boolean)),
					] as string[];

					setDynamicOptions((prev) => ({
						...prev,
						place: places,
						profession: professions,
					}));
				}
			} catch (error) {
				console.error('Error fetching jobs:', error);
			}
		};
		getJobs();
	}, []);

	const handleSelectChange = (value: string) => {
		setActiveTab('Tất cả');
		setFilterValue(value as 'place' | 'profession' | 'salary');
		handleFilter(value, 'Tất cả');
	};

	const handleChangeFilter = (value: string) => {
		setActiveTab(value);
		handleFilter(filterValue, value);
	};

	const handleFilter = (value: string, tab: string) => {
		console.log('loc theo ', value, tab);
	};

	const sProps: SelectProps = {
		options: [
			{
				value: 'place',
				label: <span className='font-semibold!'>Địa điểm</span>,
			},
			{
				value: 'profession',
				label: <span className='font-semibold!'>Lĩnh vực</span>,
			},
			{
				value: 'salary',
				label: <span className='font-semibold!'>Mức lương</span>,
			},
		],
		className: 'font-semibold! rounded-md',
		value: filterValue,
		onChange: handleSelectChange,
	};

	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 9; // 3x3 = 9 item mỗi trang

	// Logic tính toán slice dữ liệu
	const filteredJobs = useMemo(() => {
		if (activeTab === 'Tất cả') return jobs;

		return jobs.filter((job) => {
			if (filterValue === 'place') return job.location === activeTab;
			if (filterValue === 'profession') return job.category === activeTab;
			if (filterValue === 'salary') {
				// USD filtering
				const minVal = job.minSalary;
				if (activeTab === 'Dưới 500$') return minVal < 500;
				if (activeTab === '500-1,000$') return minVal >= 500 && minVal <= 1000;
				if (activeTab === '1,000-2,000$')
					return minVal >= 1000 && minVal <= 2000;
				if (activeTab === 'Trên 2,000$') return minVal > 2000;
			}
			return true;
		});
	}, [jobs, activeTab, filterValue]);

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentJobs = filteredJobs.slice(startIndex, endIndex);

	// 3. Hàm xử lý khi đổi trang
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll lên đầu trang khi chuyển trang (UX tốt hơn)
	};
	return (
		<div className='py-20'>
			<Container>
				<div className=''>
					<div className='flex items-center'>
						<img src={fireIcon} alt='Fire icon' />
						<h2 className='ml-2 text-[28px] font-semibold bg-linear-to-r from-[#FF5722] to-[#f6b28f] bg-clip-text text-transparent'>
							Việc làm tuyển gấp
						</h2>
					</div>
					<div className=' my-10 flex items-center gap-50'>
						<div className='flex-1 flex items-center gap-2'>
							<div className='flex items-center gap-1 text-[14px] font-semibold text-gray-400 whitespace-nowrap'>
								<Funnel width={18} />
								Lọc theo:
							</div>

							<Select
								{...sProps}
								className='flex-1 font-semibold! rounded-md'
							/>
						</div>

						<div className='w-[750px] flex justify-end'>
							<FilterScrollMenu
								data={dynamicOptions[filterValue]}
								theme='#FF5722'
								activeTab={activeTab}
								onChangeFilter={handleChangeFilter}
							/>
						</div>
					</div>
					<div className='min-h-[520px] mb-8'>
						{currentJobs.length > 0 ? (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
								{currentJobs.map((job) => (
									<JobCard
										key={job.id}
										id={+job.id}
										title={job.title}
										category={job.category}
										minSalary={+job.minSalary}
										maxSalary={+job.maxSalary}
										location={job.location}
									/>
								))}
							</div>
						) : (
							<div className='flex flex-col items-center justify-center h-[500px] bg-gray-50/50 rounded-xl border border-dashed border-gray-200'>
								<Empty
									description={
										<div className='text-gray-500'>
											<p className='text-lg font-semibold'>Không tìm thấy việc làm phù hợp</p>
											<p>Vui lòng thử lại với các tiêu chí khác hoặc xoá bớt bộ lọc</p>
										</div>
									}
								/>
							</div>
						)}
					</div>
					<div className='flex justify-center'>
						<Pagination
							current={currentPage}
							total={filteredJobs.length}
							pageSize={pageSize}
							onChange={handlePageChange}
							showSizeChanger={false} // Tắt thay đổi số lượng item/page nếu muốn cố định 3x3
						/>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default JobSection;
