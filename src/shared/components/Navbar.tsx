import { Link, NavLink } from 'react-router-dom';
import bagIcon from '../../assets/icons/briefcase.png';
const navItems = [
	{ to: '/job', label: 'Việc Làm' },
	{ to: '/util', label: 'Công cụ' },
	{ to: '/blog', label: 'Cẩm nang nghề nghiệp' },
];

const Navbar = () => {
	return (
		<header>
			<div className='flex items-center'>
				{/* Logo */}
				<div className='flex-1'>
					<Link to='/' className='text-2xl font-bold text-[#4fccff]'>
						CV<span className='text-white text-xl'>24H.VN</span>
					</Link>
				</div>

				{/* Menu */}
				<nav className='flex flex-3 gap-1 '>
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								`relative px-3 py-5 font-semibold text-[15px] hover:bg-[#2f0d7b] transition ${
									isActive ? '  text-[#4fccff]' : 'text-white'
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				{/* Auth */}
				<div className='flex flex-2 justify-end items-center'>
					<Link to='/login' className='text-white font-semibold '>
						<div className='hover:bg-[#2f0d7b] px-4 py-2 border-r border-white/20'>
							<span className='text-[12px]'>Người tìm việc</span>
							<br />
							<span className='text-[14px]'>Đăng nhập/Đăng kí</span>
						</div>
					</Link>
					<div className='flex items-center font-bold gap-2 px-4 py-2  hover:bg-[#2f0d7b]'>
						<img src={bagIcon} alt='bag icon' />
						<div>
							<span className='text-white text-[12px]'>Dành cho </span>
							<br />
							<span className='text-white text-[14px]'>Nhà Tuyển Dụng</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
