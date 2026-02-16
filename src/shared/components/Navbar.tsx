import { Link, NavLink } from 'react-router-dom';
import bagIcon from '../../assets/icons/briefcaseIcon.png';
import teamIcon from '../../assets/icons/teamIcon.png';
import avt from '../../assets/imgs/avt.png';
import { ChevronDown } from 'lucide-react';
import {
	UserOutlined,
	FileTextOutlined,
	BellOutlined,
	SettingOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { Divider, Modal } from 'antd';
import { LogoutApi } from '../../service/Api/Auth/Auth';
interface INavbarProps {
	navItems: { to: string; label: string }[];
	isRecruiter?: boolean;
}

const Navbar = ({ navItems, isRecruiter }: INavbarProps) => {
	const user = localStorage.getItem('user');
	const [modal, contextHolder] = Modal.useModal();

	const handleLogout = () => {
		modal.confirm({
			title: 'Xác nhận đăng xuất',
			content: 'Bạn có chắc chắn muốn đăng xuất?',
			okText: 'Đăng xuất',
			cancelText: 'Hủy',
			okType: 'danger',
			centered: true,
			onOk() {
				LogoutApi();
			},
		});
	};

	return (
		<header>
			{contextHolder}
			<div className='flex items-center'>
				{/* Logo */}
				<div className='flex-1'>
					<Link
						to={`/${isRecruiter ? 're' : 'ca'}`}
						className='text-2xl font-bold text-[#4fccff]'
					>
						CV
						<span
							className={
								isRecruiter ? 'text-[#2f0d7b]  text-xl' : 'text-white text-xl'
							}
						>
							24H.VN
						</span>
					</Link>
				</div>

				{/* Menu */}
				<nav className='flex flex-3 gap-1 '>
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								`relative px-3 py-5 font-semibold text-[15px] 
								${isRecruiter ? 'hover:bg-[#efeff0] text-[#414045] ' : 'hover:bg-[#2f0d7b] text-white'} transition 
								${isActive && '  text-[#4fccff]!'} 
								`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				{/* Auth */}

				<div className='flex flex-2 justify-end items-center'>
					{user ? (
						<div className='relative group'>
							<div className='flex items-center gap-2 py-2 px-4  border-[#8b8b8b] border-r hover:bg-[#2f0d7b] cursor-pointer transition duration-300'>
								<img
									src={avt}
									className='w-10 h-10 rounded-full'
									alt='avatar'
								/>
								<p className='text-white font-semibold text-[14px]'>Phát</p>
								<span className='text-white pt-1'>
									<ChevronDown />
								</span>
							</div>

							<div
								className=' absolute top-full right-0 mt-2 z-10
												opacity-0 invisible pointer-events-none
												translate-y-3 scale-95
												transition-all duration-100
												
												group-hover:opacity-100
												group-hover:visible
												group-hover:pointer-events-auto
												group-hover:translate-y-0
												group-hover:scale-100

												before:content-[""]
												before:absolute
												before:-top-2
												before:left-0
												before:w-full
												before:h-2
												before:bg-transparent '
							>
								<div className='bg-white rounded-2xl shadow-2xl border border-gray-100 w-60 p-2'>
									{/* Item 1 */}
									<Link
										to='/ca/profile'
										className='flex items-center p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all group'
									>
										<UserOutlined className='text-blue-500 text-lg mr-3' />
										<span className='text-gray-700 font-medium flex-1'>
											Hồ sơ của tôi
										</span>
									</Link>

									{/* Item 2 */}
									<div className='flex items-center p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all	'>
										<FileTextOutlined className='text-blue-400 text-lg mr-3' />
										<span className='text-gray-700 font-medium flex-1'>
											Tạo CV
										</span>
									</div>

									{/* Item 4 */}
									<div className='flex items-center p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all'>
										<BellOutlined className='text-blue-500 text-lg mr-3' />
										<span className='text-gray-700 font-medium flex-1'>
											Hỗ trợ và thông báo
										</span>
									</div>

									{/* Item 5 */}
									<Link
										to='/ca/profile/account'
										className='flex items-center p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all'
									>
										<SettingOutlined className='text-blue-500 text-lg mr-3' />
										<span className='text-gray-700 font-medium flex-1'>
											Quản lý tài khoản
										</span>
									</Link>
									<Divider className='my-0!' />
									<div
										className='flex items-center p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all'
										onClick={handleLogout}
									>
										<LogoutOutlined className='text-blue-500 text-lg mr-3' />
										<span className='text-gray-700 font-medium flex-1'>
											Đăng xuất
										</span>
									</div>
								</div>
							</div>
						</div>
					) : (
						<Link
							to={`/auth/${isRecruiter ? 're' : 'ca'}/login`}
							className='text-white font-semibold '
						>
							<div
								className={`${isRecruiter ? 'hover:bg-[#efeff0] text-[#414045] border-[#d5d5d5] ' : 'hover:bg-[#2f0d7b] text-white border-white/20'} px-4 py-2 border-r `}
							>
								<span className='text-[12px]'>Người tìm việc</span>
								<br />
								<span className='text-[14px] font-bold'>Đăng nhập/Đăng kí</span>
							</div>
						</Link>
					)}

					<Link
						to={`/${isRecruiter ? 'ca' : 're'}`}
						className={`min-w-[180px] flex items-center font-semibold gap-2 px-4 py-2 cursor-pointer  ${isRecruiter ? 'hover:bg-[#efeff0] text-[#414045] ' : 'hover:bg-[#2f0d7b] text-white'}  `}
					>
						<img
							src={isRecruiter ? teamIcon : bagIcon}
							alt={isRecruiter ? 'team icon' : 'bag icon'}
							className='w-7 h-7'
						/>
						<div>
							<span className=' text-[12px]'>Đi đến trang của </span>
							<br />
							<span className=' text-[14px] font-bold '>
								{!isRecruiter ? 'Nhà Tuyển Dụng' : 'Người Tìm Việc'}
							</span>
						</div>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
