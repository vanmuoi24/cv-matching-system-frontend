import { RiseOutlined } from '@ant-design/icons';
import achieveIcon from '../../../../../assets/icons/achieveIcon.png';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../../shared/components/Container';
import { GetListCompany } from '../../../../../service/Api/Company/Company';
import type { ICompany } from '../../../../../types/TypeCompany';
import { useEffect, useState } from 'react';

const FeaturedCompanies = () => {
	const navigate = useNavigate();
	const [dataCompany, setDataCompany] = useState<ICompany[]>([]);
	const fechDataCompany = async () => {
		try {
			const res = await GetListCompany();
			if (res && res.code === 1000 && res.result) {
				setDataCompany(res.result);
			} else {
				console.error(
					'Lỗi khi lấy danh sách công ty:',
					res?.message || 'Không có thông tin lỗi',
				);
			}
		} catch (error) {
			console.error('Lỗi khi gọi API lấy danh sách công ty:', error);
		}
	};

	useEffect(() => {
		fechDataCompany();
	}, []);

	return (
		<div className='bg-[#fffff8e0] py-30 '>
			<Container>
				{/* --- HEADER SECTION --- */}
				<div className='flex justify-between items-center mb-6'>
					<div className='flex items-center gap-3'>
						<img src={achieveIcon} alt='AchieveIcon icon' />
						<h2 className='ml-2 text-[28px] font-semibold bg-gradient-to-r from-[#f6b800] to-[#fae68f] bg-clip-text text-transparent'>
							Công ty nổi bật
						</h2>
					</div>
				</div>

				{/* --- LIST COMPANIES (GRID / SCROLL) --- */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
					{dataCompany.slice(0, 6).map((company) => (
						<div
							key={company.id}
							onClick={() => navigate(`/ca/company/${company.id}`)}
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
									src={company.logoUrl}
									alt={company.name}
									className='max-h-full max-w-full object-contain transition-all duration-300'
								/>
							</div>

							{/* Job Count Info */}
							<div className='bg-gray-50 rounded-full px-3 py-1 text-xs font-medium text-gray-600 flex items-center gap-1 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors'>
								<RiseOutlined />
								<span>{company.job} vị trí đang tuyển</span>
							</div>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default FeaturedCompanies;
