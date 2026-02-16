import { ChartLine, Code, Handbag, HandCoins, UserSearch } from 'lucide-react';
import Container from '../../../../../shared/components/Container';
import banner from '../../../../../assets/imgs/banner.webp';
const categories = [
	{
		id: 1,
		name: 'Bán sỉ - Bán lẻ - Quản lý cửa hàng',
		icon: <Handbag className='text-amber-500' />,
	},
	{
		id: 2,
		name: 'IT - Phần mềm',
		icon: <Code className='text-violet-500' />,
	},
	{
		id: 3,
		name: 'Marketing - Quảng cáo',
		icon: <ChartLine className='text-blue-500' />,
	},
	{
		id: 4,
		name: 'Nhân sự - Tuyển dụng',
		icon: <UserSearch className='text-green-500' />,
	},
	{
		id: 5,
		name: 'Tài chính - Kế toán',
		icon: <HandCoins className='text-yellow-500' />,
	},
];

const CategorySection = () => {
	return (
		<div className='mt-10'>
			<Container>
				<div className='flex items-center gap-x-4 h-[240px]'>
					<div className='flex-2 h-full'>
						<div className='bg-[#f6f9ff] shadow-md p-2 rounded-lg h-full'>
							<div className='flex flex-col gap-0.5 justify-between h-full'>
								{categories.map((category) => (
									<div
										className='flex items-center gap-x-2 hover:bg-blue-100 p-2 rounded-lg transition duration-300 cursor-pointer'
										key={category.id}
									>
										<p>{category.icon}</p>
										<p className='text-sm font-medium text-gray-600'>
											{category.name}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='flex-5'>
						<div className='rounded-lg overflow-hidden'>
							<img
								src={banner}
								alt='Banner'
								className='w-full h-full object-cover'
							/>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default CategorySection;
