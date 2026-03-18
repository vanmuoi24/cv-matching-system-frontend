import Navbar from './Navbar';
import Container from './Container';
import notification from '../../assets/imgs/notification-bar.png';

interface IHeaderProps {
	navItems?: { to: string; label: string }[];
	isRecruiter?: boolean;
}

const Header = ({ navItems = [], isRecruiter }: IHeaderProps) => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			<div className='bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-black/5'>
				<div className='mx-auto flex items-center justify-center gap-2 px-3 py-2 flex-wrap'>
					<img
						src={notification}
						alt='notification'
						className='h-5 w-auto opacity-90'
					/>
					<p className='text-[13px] sm:text-[14px] font-semibold text-gray-800 text-center leading-snug'>
						{isRecruiter ? (
							'Thông báo tức thì, phản hồi hồ sơ nhanh & dễ dàng hơn!'
						) : (
							<>
								Ứng tuyển 1 chạm - Mọi lúc mọi nơi
								<span className='font-bold ml-2'>CV24h: Tìm Việc Nhanh</span>
							</>
						)}
					</p>
				</div>
			</div>
			<div
				className={[
					isRecruiter ? 'bg-[#f6f6f6]' : 'bg-[#451fa3]',
					'shadow-sm border-b border-black/5',
				].join(' ')}
			>
				<Container>
					<Navbar navItems={navItems} isRecruiter={isRecruiter} />
				</Container>
			</div>
		</header>
	);
};

export default Header;
