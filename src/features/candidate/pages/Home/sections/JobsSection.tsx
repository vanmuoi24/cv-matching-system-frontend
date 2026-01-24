import { Pagination, Select, type SelectProps } from 'antd';
import fireIcon from '../../../../../assets/icons/fireIcon.png';
import Container from '../../../../../shared/components/Container';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import FilterScrollMenu from '../../../components/FilterScrollMenu/FilterScrollMenu';
import JobCard from '../../../components/Card/JobCard';

// 1. Tạo dữ liệu giả (30 jobs) để test phân trang
const MOCK_JOBS = Array.from({ length: 30 }, (_, i) => ({
	id: i,
	title: `Nhân Viên Kỹ Thuật Cơ - Điện Tử ${i + 1}`,
	companyName: 'Công Ty TNHH TM-DV-SX Tự Động Hóa Kim Thời Đại',
	salary: `${9 + (i % 5)} - ${15 + (i % 5)} triệu`,
	location: i % 2 === 0 ? 'TP.HCM' : 'Long An',
	time: 'Còn 1 ngày',
	logo: 'https://via.placeholder.com/64',
}));

const dataScrollMenu = {
	place: [
		'Tất cả',
		'Hồ Chí Minh',
		'Hà Nội',
		'Đà Nẵng',
		'TP.HCM',
		'Hồ Chí Minh',
		'Hà Nội',
		'Đà Nẵng',
		'TP.HCM',
		'Hồ Chí Minh',
		'Hà Nội',
		'Đà Nẵng',
		'TP.HCM',
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
				label: 'Địa điểm',
			},
			{
				value: 'profession',
				label: 'Lĩnh vực',
			},
			{
				value: 'experience',
				label: 'Kinh nghiệm',
			},
			{
				value: 'salary',
				label: 'Mức lương',
			},
		],
		defaultValue: 'Địa điểm',
		onChange: handleSelectChange,
	};

	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 9; // 3x3 = 9 item mỗi trang

	// 2. Logic tính toán slice dữ liệu
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentJobs = MOCK_JOBS.slice(startIndex, endIndex);

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
						<div className='flex-1'>
							<Select
								{...sProps}
								className='w-full font-semibold py-2! rounded-md!'
								prefix={
									<p className='flex items-center gap-1 text-[14px] font-semibold text-gray-400'>
										<Funnel width={18} />
										Lọc theo:{' '}
									</p>
								}
							/>
						</div>
						<div className='w-[750px] flex justify-end'>
							<FilterScrollMenu
								data={dataScrollMenu[filterValue]}
								theme='#FF5722'
							/>
						</div>
					</div>
					<div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
							{currentJobs.map((job) => (
								<JobCard
									key={job.id}
									title={job.title}
									companyName={job.companyName}
									salary={job.salary}
									location={job.location}
									time={job.time}
									logo={job.logo}
								/>
							))}
						</div>
					</div>
					<div className='flex justify-center'>
						<Pagination
							current={currentPage}
							total={MOCK_JOBS.length}
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
