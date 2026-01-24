import {
	HeartOutlined,
	DollarCircleOutlined,
	EnvironmentOutlined,
	ClockCircleOutlined,
} from '@ant-design/icons';
interface JobCardProps {
	title: string;
	companyName: string;
	salary: string;
	location: string;
	time: string;
	logo: string;
}

const JobCard = ({
	title,
	companyName,
	salary,
	location,
	time,
	logo,
}: JobCardProps) => {
	return (
		<div className='max-w-100 w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer relative'>
			{/* Header: Title & Save Button */}
			<div className='flex justify-between items-start gap-2 mb-2'>
				<h3 className='font-bold text-gray-800 text-lg leading-tight line-clamp-2 flex-1'>
					{title}
				</h3>
				<button className='text-blue-500 hover:bg-blue-50 p-1 rounded-full transition-colors'>
					<HeartOutlined style={{ fontSize: '20px' }} />
				</button>
			</div>

			{/* Body: Logo & Info */}
			<div className='flex gap-3'>
				{/* Logo Company */}
				<div className='w-16 h-16 shrink-0 border border-gray-100 rounded-lg overflow-hidden p-1 flex items-center justify-center bg-white'>
					<img
						src={logo}
						alt='Company Logo'
						className='w-full h-full object-contain'
					/>
				</div>

				{/* Info Details */}
				<div className='flex flex-col gap-1 flex-1 min-w-0'>
					{/* Company Name - line-clamp-1 để cắt chữ + dấu ... */}
					<p className='text-gray-500 text-sm truncate w-full'>{companyName}</p>

					{/* Salary */}
					<div className='flex items-center gap-2 text-blue-600 font-medium text-sm'>
						<DollarCircleOutlined />
						<span>{salary}</span>
					</div>

					{/* Location */}
					<div className='flex items-center gap-2 text-gray-500 text-sm'>
						<EnvironmentOutlined />
						<span className='truncate'>{location}</span>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className='my-3 border-t border-dashed border-gray-200'></div>

			{/* Footer: Time */}
			<div className='flex justify-end items-center gap-1 text-gray-500 text-sm'>
				<ClockCircleOutlined />
				<span>{time}</span>
			</div>
		</div>
	);
};

export default JobCard;
