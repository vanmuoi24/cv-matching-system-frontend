import { Pagination, Select, type SelectProps } from 'antd';
import fireIcon from '../../../../../assets/icons/fireIcon.png';
import Container from '../../../../../shared/components/Container';
import { Funnel } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterScrollMenu from '../../../components/FilterScrollMenu/FilterScrollMenu';
import JobCard from '../../../components/Card/JobCard';
import { JobsApi } from '../../../../../service/Api/Job/Job';
import { type IJob } from '../../../../../types/TypeJob';

const dataScrollMenu = {
	place: [
		'Tất cả',
		'Hồ Chí Minh',
		'Hà Nội',
		'Đà Nẵng',
		'Cần Thơ',
		'Bình Dương',
		'Đồng Nai',
		'Bà Rịa - Vũng Tàu',
	],
	salary: [
		'Tất cả',
		'Dưới 1 triệu',
		'1-10 triệu',
		'10-15 triệu',
		'15-20 triệu',
		'Trên 25 triệu',
	],
	experience: [
		'Tất cả',
		'Dưới 1 năm',
		'1-2 năm',
		'2-3 năm',
		'3-5 năm',
		'5-10 năm',
		'Trên 10 năm',
	],
	profession: [
		'Tất cả',
		'IT',
		'Kinh doanh',
		'Y tế',
		'Giáo dục',
		'Y tế',
		'Giáo dục',
	],
};

const JobSection = () => {
	const [filterValue, setFilterValue] = useState<
		'place' | 'profession' | 'experience' | 'salary'
	>('place');

	const [jobs, setJobs] = useState<IJob[]>([]);

	useEffect(() => {
		const getJobs = async () => {
			try {
				const response = await JobsApi();
				if (response.code === 1000 && response.result) {
					setJobs(response.result);
				}
			} catch (error) {
				console.error('Error fetching jobs:', error);
			}
		};
		getJobs();
	}, []);

	const handleSelectChange = (value: string) => {
		console.log(value);
		console.log(
			dataScrollMenu[value as 'place' | 'profession' | 'experience' | 'salary'],
		);
		setFilterValue(value as 'place' | 'profession' | 'experience' | 'salary');
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
				value: 'experience',
				label: <span className='font-semibold!'>Kinh nghiệm</span>,
			},
			{
				value: 'salary',
				label: <span className='font-semibold!'>Mức lương</span>,
			},
		],
		className: 'font-semibold! rounded-md',
		value: 'place',
		onChange: handleSelectChange,
	};

	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 9; // 3x3 = 9 item mỗi trang

	// 2. Logic tính toán slice dữ liệu
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentJobs = jobs.slice(startIndex, endIndex);

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
								data={dataScrollMenu[filterValue]}
								theme='#FF5722'
							/>
						</div>
					</div>
					<div className='min-h-[520px] mb-8'>
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
					</div>
					<div className='flex justify-center'>
						<Pagination
							current={currentPage}
							total={jobs.length}
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
