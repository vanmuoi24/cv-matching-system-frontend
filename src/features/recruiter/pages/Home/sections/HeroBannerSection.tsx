import heroBanner from '../../../../../assets/imgs/heroBanner.png';
import Container from '../../../../../shared/components/Container';

const HeroBanner = () => {
	return (
		<section className='relative w-full bg-white overflow-hidden py-12 md:py-20'>
			<Container>
				<div className='flex flex-col md:flex-row items-center justify-between'>
					{/* Cột trái: Nội dung văn bản */}
					<div className='w-full md:w-1/2 z-10 text-left mb-10 md:mb-0'>
						<div className='w-16 h-1 bg-indigo-700 mb-6'></div>
						<h1 className='text-4xl font-bold text-gray-900 leading-tight mb-6'>
							Nơi gặp gỡ giữa doanh nghiệp <br />
							và 10 triệu ứng viên{' '}
							<span className='relative inline-block'>
								chất lượng
								{/* Hiệu ứng gạch chân xanh */}
								<span className='rounded-2xl absolute bottom-1 left-0 w-full h-2 bg-cyan-400 -z-10 opacity-60'></span>
							</span>
						</h1>
						<p className='text-gray-600 font-semibold text-lg mb-8 max-w-md'>
							Tuyển người dễ dàng với{' '}
							<span className='text-[#4fccff] font-bold'>CV24h</span> - Chúng
							tôi luôn có ứng viên phù hợp cho bạn
						</p>
						<button className=' px-20 py-4 text-white cursor-pointer bg-[#5932bc] hover:bg-[#2f0d7b]  border-none rounded text-base font-medium shadow-lg transition duration-300'>
							Đăng tin ngay!
						</button>
					</div>

					<div className='w-full md:w-1/2 relative flex justify-center items-center'>
						<div className='absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50'></div>

						<div className='relative z-10'>
							<img
								src={heroBanner}
								alt='Banner Việc làm 24h'
								className='max-w-full h-auto '
							/>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default HeroBanner;
