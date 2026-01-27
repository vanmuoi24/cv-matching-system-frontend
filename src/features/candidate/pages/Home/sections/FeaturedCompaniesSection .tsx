import { RiseOutlined } from '@ant-design/icons';
import achieveIcon from '../../../../../assets/icons/achieveIcon.png';
import momo from '../../../../../assets/imgs/momo.webp';
import maison from '../../../../../assets/imgs/maison.jpeg';
import doji from '../../../../../assets/imgs/doji.jpeg';
import abbott from '../../../../../assets/imgs/abbott.jpeg';
import dhg from '../../../../../assets/imgs/dhg.png';
import matbao from '../../../../../assets/imgs/matbao.png';
import Container from '../../../../../shared/components/Container';
// 1. Mock Data (Dữ liệu giả lập các công ty trong hình)
const COMPANIES = [
	{
		id: 1,
		name: 'MoMo',
		logo: momo,
		jobCount: 21,
	},
	{
		id: 2,
		name: 'Maison',
		logo: maison,
		jobCount: 30,
	},
	{
		id: 3,
		name: 'Doji',
		logo: doji,
		jobCount: 5,
	},
	{
		id: 4,
		name: 'Abbott',
		logo: abbott,
		jobCount: 19,
	},
	{
		id: 5,
		name: 'DHG Pharma',
		logo: dhg,
		jobCount: 26,
	},
	{
		id: 6,
		name: 'Matbao',
		logo: matbao,
		jobCount: 147,
	},
];

const FeaturedCompanies = () => {
	return (
		<div className='bg-[#fffff8e0] py-30 '>
			<Container>
				{/* --- HEADER SECTION --- */}
				<div className='flex justify-between items-center mb-6'>
					<div className='flex items-center gap-3'>
						<img src={achieveIcon} alt='AchieveIcon icon' />
						<h2 className='ml-2 text-[28px] font-semibold bg-linear-to-r from-[#f6b800] to-[#fae68f] bg-clip-text text-transparent'>
							Công ty nổi bật
						</h2>
					</div>

					{/* <a
						href='#'
						className='text-purple-600 font-medium hover:underline flex items-center gap-1 hover:text-purple-700 transition-colors'
					>
						Xem tất cả <RightOutlined style={{ fontSize: '12px' }} />
					</a> */}
				</div>

				{/* --- LIST COMPANIES (GRID / SCROLL) --- */}
				{/* Sử dụng Grid để tự động xuống dòng trên mobile, hoặc flex để cuộn ngang */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
					{COMPANIES.map((company) => (
						<div
							key={company.id}
							className='
              group cursor-pointer
              border border-gray-200 rounded-xl p-4 
              flex flex-col items-center justify-between gap-4
              transition-all duration-300
              hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 bg-white
            '
						>
							{/* Logo Container */}
							<div className='w-full h-20 flex items-center justify-center'>
								<img
									src={company.logo}
									alt={company.name}
									className='max-h-full max-w-full object-contain transition-all duration-300'
								/>
							</div>

							{/* Job Count Info */}
							<div className='bg-gray-50 rounded-full px-3 py-1 text-xs font-medium text-gray-600 flex items-center gap-1 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors'>
								<RiseOutlined />
								<span>{company.jobCount} vị trí đang tuyển</span>
							</div>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default FeaturedCompanies;
