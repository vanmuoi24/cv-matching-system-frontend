import { Link, NavLink } from 'react-router-dom';
import bagIcon from '../../assets/icons/briefcaseIcon.png';
import teamIcon from '../../assets/icons/teamIcon.png';

interface INavbarProps {
	navItems: { to: string; label: string }[];
	isRecruiter?: boolean;
}

const Navbar = ({ navItems, isRecruiter }: INavbarProps) => {
	return (
		<header>
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
