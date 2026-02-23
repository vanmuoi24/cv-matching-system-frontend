import Navbar from './Navbar';
import Container from './Container';
import notification from '../../assets/imgs/notification-bar.png';

interface IHeaderProps {
	navItems: { to: string; label: string }[];
	isRecruiter?: boolean;
}

const Header = ({ navItems, isRecruiter }: IHeaderProps) => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			<div className='flex items-center justify-center gap-2 bg-white'>
				<div className='w-25'>
					<img src={notification} alt='notification' />
				</div>
				<p className='text-[15px] font-semibold'>
					{isRecruiter ? (
						'Thông báo tức thì, phản hồi hồ sơ nhanh & dễ dàng hơn!'
					) : (
						<>
							Ứng tuyển 1 chạm - Mọi lúc mọi nơi
							<span className='font-bold ml-2'> CV24h: Tìm Việc Nhanh</span>
						</>
					)}
				</p>
			</div>
			<div className={isRecruiter ? 'bg-[#f6f6f6]' : 'bg-[#451fa3]'}>
				<Container>
					<Navbar navItems={navItems} isRecruiter={isRecruiter} />
				</Container>
			</div>
		</header>
	);
};

export default Header;
