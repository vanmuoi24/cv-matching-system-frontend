import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, HelpCircle, User, LogOut } from 'lucide-react';
import { Divider, Modal } from 'antd';
import { LogoutApi } from '../../service/Api/Auth/Auth';
import { useMemo } from 'react';

interface INavbarProps {
	navItems: { to: string; label: string }[];
	isRecruiter?: boolean;
}

const Navbar = ({ navItems, isRecruiter }: INavbarProps) => {
	const userLocal = localStorage.getItem('user');
	const user = useMemo(
		() => (userLocal ? JSON.parse(userLocal) : null),
		[userLocal],
	);
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
		<header
			className={`sticky top-0 z-50 w-full transition-all duration-300 ${
				isRecruiter
					? 'bg-transparent shadow-none'
					: 'bg-transparent shadow-none'
			}`}
		>
			{contextHolder}
			<div className=''>
				<div className='flex justify-between items-center h-16 sm:h-18'>
					{/* Logo */}
					<div className='flex items-center shrink-0'>
						<Link
							to={`/${isRecruiter ? 're' : 'ca'}`}
							className='flex items-center gap-1.5'
						>
							<span className='text-3xl font-black text-[#4fccff]! tracking-tighter drop-shadow-sm'>
								CV
							</span>
							<span
								className={`text-2xl font-black tracking-tight drop-shadow-sm ${
									isRecruiter ? 'text-[#2f0d7b]!' : 'text-white!'
								}`}
							>
								24H.VN
							</span>
						</Link>
					</div>

					{/* Navigation Menu */}
					<nav className='hidden md:flex items-center gap-8 mx-8'>
						{navItems.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								end
								className={({ isActive }) =>
									`relative py-1 text-[15px] font-semibold transition-all duration-300 ${
										isRecruiter
											? isActive
												? 'text-white!'
												: 'text-[#4fccff]! hover:text-white!'
											: isActive
												? 'text-[#4fccff]!'
												: 'text-white! hover:text-[#4fccff]!'
									}`
								}
							>
								{({ isActive }) => (
									<>
										{item.label}
										{isActive && (
											<span
												className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
													isRecruiter ? 'bg-white' : 'bg-[#4fccff]'
												}`}
											/>
										)}
									</>
								)}
							</NavLink>
						))}
					</nav>

					{/* Actions Section */}
					<div className='flex items-center gap-4'>
						{user ? (
							<div className='relative group'>
								<div className='flex items-center gap-3 py-1.5 px-2 hover:bg-gray-100/50 rounded-full cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-100'>
									<div className='relative w-9 h-9 rounded-full overflow-hidden border border-gray-100 shrink-0 shadow-sm'>
										{user.avatarUrl ? (
											<img
												src={user.avatarUrl}
												className='w-full h-full object-cover'
												alt='avatar'
											/>
										) : (
											<div className='w-full h-full bg-gradient-to-br from-[#4fccff] to-[#2f0d7b] flex items-center justify-center text-white text-[13px] font-bold'>
												{user.fullName?.charAt(0).toUpperCase() || 'U'}
											</div>
										)}
									</div>
									<div className='hidden lg:block'>
										<p
											className={`text-[14px] font-bold leading-none mb-0.5 truncate max-w-30 ${
												isRecruiter ? 'text-[#2f0d7b]' : 'text-white'
											}`}
										>
											{user.fullName || 'Người dùng'}
										</p>
										<p
											className={`text-[11px] font-medium mb-0 uppercase tracking-wide opacity-70 ${
												isRecruiter ? 'text-[#2f0d7b]/70' : 'text-white/70'
											}`}
										>
											{isRecruiter ? 'Nhà tuyển dụng' : 'Ứng viên'}
										</p>
									</div>
									<ChevronDown
										size={14}
										className={`transition-colors shrink-0 ${
											isRecruiter
												? 'text-[#2f0d7b]/40 group-hover:text-[#2f0d7b]'
												: 'text-white/60 group-hover:text-white'
										}`}
									/>
								</div>

								{/* Dropdown Menu */}
								<div className='absolute right-0 top-full pt-2 group-hover:block hidden'>
									{/* Invisible bridge to keep dropdown open */}
									<div className='absolute -top-4 left-0 w-full h-4 bg-transparent' />
									
									<div className='w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 transform origin-top-right transition-all duration-200'>
										<div className='px-4 py-3 bg-gray-50/80 rounded-xl mb-1.5'>
											<p className='text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1'>
												Tài khoản đăng nhập
											</p>
											<p className='text-[13px] text-gray-800 font-bold truncate mb-0'>
												{user.email}
											</p>
										</div>

										<Link
											to='/ca/profile'
											className='flex items-center gap-3 p-2.5 hover:bg-[#4fccff]/10 rounded-lg transition-colors group/item'
										>
											<div className='w-8 h-8 rounded-lg bg-[#4fccff]/10 flex items-center justify-center text-[#4fccff] group-hover/item:bg-[#4fccff] group-hover/item:text-white transition-colors'>
												<User size={16} />
											</div>
											<span className='text-[14px] text-gray-700 font-semibold'>
												Thông tin cá nhân
											</span>
										</Link>

										<Divider className='my-1.5!' />

										<div
											onClick={handleLogout}
											className='flex items-center gap-3 p-2.5 hover:bg-red-50 rounded-lg transition-colors group/item cursor-pointer'
										>
											<div className='w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors'>
												<LogOut size={16} />
											</div>
											<span className='text-[14px] text-red-600 font-bold underline decoration-red-200 underline-offset-4'>
												Đăng xuất
											</span>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className='flex items-center gap-3'>
								<Link
									to={`/auth/${isRecruiter ? 're' : 'ca'}/login`}
									className={`px-6 py-2.5 text-[14px] font-bold rounded-full shadow-lg transition-all active:scale-95 ${
										isRecruiter
											? 'text-white! bg-[#4fccff]! hover:bg-[#1f0a53] shadow-[#2f0d7b]/20'
											: 'text-[#2f0d7b]! bg-white! hover:bg-[#3db8e6] shadow-[#4fccff]/20'
									}`}
								>
									Đăng nhập
								</Link>
							</div>
						)}

						{/* Toggle Mode Button */}
						<Link
							to={`/${isRecruiter ? 'ca' : 're'}`}
							className={`flex items-center gap-2.5 px-4 py-2 border rounded-full transition-all duration-300 shrink-0 ${
								isRecruiter
									? 'border-[#2f0d7b]/20 text-[#4fccff]! hover:bg-[#2f0d7b]/5'
									: 'border-white/20 text-white! hover:bg-white/10'
							}`}
						>
							<div
								className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
									isRecruiter ? 'bg-[#2f0d7b]/10' : 'bg-white/20'
								}`}
							>
								<HelpCircle size={16} />
							</div>
							<span className='text-[12px] font-bold whitespace-nowrap hidden sm:block'>
								{isRecruiter ? 'Người Tìm Việc' : 'Nhà Tuyển Dụng'}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
