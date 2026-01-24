import unicharm from '../../../../../assets/imgs/unicharm.png';
import vinamilk from '../../../../../assets/imgs/vinamilk.jpg';
import thaco from '../../../../../assets/imgs/tahco.png';
import vinasoy from '../../../../../assets/imgs/vinasoy.png';
import cocaCola from '../../../../../assets/imgs/coca.png';
import vinataba from '../../../../../assets/imgs/vinataba.png';
const CustomerSection = () => {
	// Danh sách giả lập link logo các thương hiệu
	const logos = [
		{
			name: 'Unicharm',
			img: unicharm,
		},
		{
			name: 'Vinamilk',
			img: vinamilk,
		},
		{
			name: 'Thaco',
			img: thaco,
		},
		{
			name: 'Vinasoy',
			img: vinasoy,
		},
		{
			name: 'Coca Cola',
			img: cocaCola,
		},
		{
			name: 'Vinataba',
			img: vinataba,
		},
	];

	return (
		<section className='py-16 px-4 bg-white'>
			<div className='max-w-6xl mx-auto'>
				{/* Tiêu đề section */}
				<div className='text-center mb-12'>
					<div className='w-12 h-1 bg-blue-500 mx-auto mb-6'></div>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
						Khách hàng của chúng tôi
					</h2>
				</div>

				{/* Lưới Logo */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
					{logos.map((logo, index) => (
						<div
							key={index}
							className='border rounded-lg border-gray-200 aspect-square flex items-center justify-center p-4 hover:shadow-md hover:border-blue-500 transition-all duration-300'
						>
							<img
								src={logo.img}
								alt={logo.name}
								className='max-w-full max-h-full object-contain transition-all duration-300'
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CustomerSection;
