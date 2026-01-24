import Navbar from './Navbar';
import Container from './Container';
import notification from '../../assets/imgs/notification-bar.png';
const Header = () => {
	return (
		<header>
			<div className='flex items-center justify-center gap-2 '>
				<div className='w-25'>
					<img src={notification} alt='notification' />
				</div>
				<p className='text-[15px] font-semibold'>
					Ứng tuyển 1 chạm - Mọi lúc mọi nơi{' '}
					<span className='font-bold'>CV24h: Tìm Việc Nhanh</span>
				</p>
			</div>
			<div className='bg-[#451fa3]'>
				<Container>
					<Navbar />
				</Container>
			</div>
		</header>
	);
};

export default Header;
