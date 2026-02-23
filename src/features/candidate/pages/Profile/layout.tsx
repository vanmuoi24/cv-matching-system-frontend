import Container from '../../../../shared/components/Container';
import { FileText, Settings, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
const ProfileLayout = () => {
	const { pathname } = useLocation();

	const [sidebarItem, setSidebarItem] = useState<string>(
		pathname.split('/')[3],
	);
	const navi = useNavigate();
	return (
		<div className='mt-10'>
			<Container>
				<div className='grid grid-cols-12 gap-6'>
					{/* Cột trái: Sidebar */}
					<div className='col-span-3'>
						<div className='bg-white border border-gray-100 rounded-xl shadow-md p-5'>
							<div className='mb-6'>
								<h2 className='font-bold text-xl text-gray-800'>Duy Phát</h2>
								<p className='text-gray-500 text-sm'>Frontend developer</p>
							</div>

							<nav className='space-y-1'>
								<SidebarItem
									icon={<FileText size={18} />}
									label='Hồ sơ của tôi'
									active={sidebarItem === 'info'}
									hasArrow={sidebarItem === 'info'}
									onClick={() => {
										setSidebarItem('info');
										navi('info');
									}}
								/>
								<SidebarItem
									icon={<Settings size={18} />}
									label='Quản lý tài khoản'
									active={sidebarItem === 'account'}
									hasArrow={sidebarItem === 'account'}
									onClick={() => {
										setSidebarItem('account');
										navi('account');
									}}
								/>
							</nav>
						</div>
					</div>

					{/* Cột giữa: Thông tin cá nhân & CV */}
					<div className='col-span-9 '>
						<Outlet />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default ProfileLayout;

const SidebarItem = ({
	icon,
	label,
	active = false,
	hasArrow = false,
	onClick,
}: any) => (
	<div
		className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${active ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
		onClick={onClick}
	>
		<div className='flex items-center gap-3 text-sm font-medium'>
			{icon}
			<span>{label}</span>
		</div>
		{hasArrow && <ChevronRight size={16} className='text-gray-400' />}
	</div>
);
