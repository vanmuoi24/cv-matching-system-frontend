import Container from '../../../../shared/components/Container';
import {
	User,
	FileText,
	PenTool,
	Briefcase,
	Bell,
	Settings,
	Mail,
	Phone,
	Calendar,
	Heart,
	Upload,
	ChevronRight,
	MapPin,
	Clock,
	DollarSign,
} from 'lucide-react';
import Info from './Modal/Info';
import { useRef, useState } from 'react';
const Profile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {
		setIsOpen(true);
	};
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUploadCV = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e?.target?.files?.[0];
		if (file) {
			alert('File đã chọn: ' + file?.name);
		}
	};
	return (
		<div className='mt-10'>
			<Container>
				<div className='grid grid-cols-12 gap-6'>
					{/* Cột trái: Sidebar */}
					<div className='col-span-3'>
						<div className='bg-white border border-gray-100 rounded-xl shadow-md p-5'>
							<div className='mb-6'>
								<h2 className='font-bold text-xl text-gray-800'>Duy Phát</h2>
								<p className='text-gray-500 text-sm'>Frontend developer</p>
							</div>

							<nav className='space-y-1'>
								<SidebarItem
									icon={<FileText size={18} />}
									label='Hồ sơ của tôi'
									active
								/>
								<SidebarItem
									icon={<Settings size={18} />}
									label='Quản lý tài khoản'
								/>
							</nav>
						</div>
					</div>

					{/* Cột giữa: Thông tin cá nhân & CV */}
					<div className='col-span-6 space-y-6  '>
						<h2 className='text-xl font-bold text-gray-800'>Hồ sơ của tôi</h2>

						{/* Box thông tin cá nhân */}
						<div className='bg-white rounded-xl shadow-sm p-6 relative border border-gray-100'>
							<div className='flex gap-6'>
								<div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 relative'>
									<User size={40} className='text-gray-300' />
									<div className='absolute bottom-0 right-0 bg-white p-1 rounded-full shadow border'>
										<PenTool size={12} />
									</div>
								</div>

								<div className='flex-1 space-y-3'>
									<div className='flex items-center gap-2'>
										<span className='text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-semibold'>
											Trạng thái tìm việc của bạn?
										</span>
									</div>
									<h3 className='text-2xl font-bold'>Duy Phát</h3>
									<p
										onClick={handleOpen}
										className='text-blue-500 text-sm cursor-pointer hover:underline'
									>
										Thêm địa chỉ hiện tại
									</p>
								</div>

								<div className='flex-1 space-y-2 text-sm text-gray-600'>
									<div className='flex items-center gap-2'>
										<Mail size={16} /> <span>hatranduyphat2004@gmail.com</span>
									</div>
									<InfoRow
										handleOnClick={handleOpen}
										icon={<Phone size={16} />}
										label='Thêm số điện thoại'
									/>
									<InfoRow
										handleOnClick={handleOpen}
										icon={<User size={16} />}
										label='Thêm giới tính'
									/>
									<InfoRow
										handleOnClick={handleOpen}
										icon={<Calendar size={16} />}
										label='Thêm ngày sinh'
									/>
									<InfoRow
										handleOnClick={handleOpen}
										icon={<Heart size={16} />}
										label='Thêm tình trạng hôn nhân'
									/>
								</div>
							</div>
						</div>

						{/* Box CV */}
						<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 cursor-pointer'>
							<h3 className='font-bold mb-4'>CV của tôi</h3>
							<div className='border-2 border-dashed border-purple-200 rounded-lg p-8 flex flex-col items-center justify-center bg-purple-50/30'>
								<button
									className='bg-purple-100 text-purple-700 px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-200 transition  cursor-pointer'
									onClick={handleUploadCV}
								>
									<Upload size={18} /> Tải lên CV có sẵn
								</button>
								<input
									type='file'
									ref={fileInputRef}
									onChange={handleFileChange}
									accept='.pdf,.doc,.docx'
									className='hidden'
								/>
								<p className='mt-3 text-xs text-gray-500'>
									Hỗ trợ định dạng: doc, docx, pdf, tối đa 5MB
								</p>
							</div>
						</div>
					</div>

					{/* Cột phải: Việc làm gợi ý */}
					<div className='col-span-3 space-y-4  '>
						<h2 className='text-xl font-bold text-gray-800'>
							Việc làm gợi ý cho bạn
						</h2>

						<JobCard
							title='Full-Stack Developer'
							company='Công Ty TNHH Mobile Oasis'
							salary='13 - 20 triệu'
							location='Bình Dương, TP.HCM'
							daysLeft={25}
						/>
						<JobCard
							title='Fresher Developer'
							company='Công Ty TNHH Car Things'
							salary='2 - 3 triệu'
							location='TP.HCM'
							daysLeft={44}
						/>
					</div>
				</div>
				<Info isOpen={isOpen} onClose={() => setIsOpen(false)} />
			</Container>
		</div>
	);
};

export default Profile;

const SidebarItem = ({
	icon,
	label,
	active = false,
	hasArrow = false,
}: any) => (
	<div
		className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${active ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
	>
		<div className='flex items-center gap-3 text-sm font-medium'>
			{icon}
			<span>{label}</span>
		</div>
		{hasArrow && <ChevronRight size={16} className='text-gray-400' />}
	</div>
);

const InfoRow = ({ icon, label, handleOnClick }: any) => (
	<div
		onClick={handleOnClick}
		className='flex items-center gap-2 text-blue-500 cursor-pointer hover:underline'
	>
		{icon} <span>{label}</span>
	</div>
);

const JobCard = ({ title, company, salary, location, daysLeft }: any) => (
	<div className='bg-white rounded-xl shadow-sm p-4 border border-transparent hover:border-purple-300 transition relative'>
		<div className='absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-red-500'>
			<Heart size={20} />
		</div>
		<h4 className='font-bold text-gray-800 pr-6'>{title}</h4>
		<p className='text-sm text-gray-500 mt-1'>{company}</p>
		<div className='mt-3 space-y-2'>
			<div className='flex items-center gap-2 text-sm text-orange-500 font-medium'>
				<DollarSign size={14} /> {salary}
			</div>
			<div className='flex items-center gap-2 text-sm text-gray-500'>
				<MapPin size={14} /> {location}
			</div>
		</div>
		<div className='mt-4 pt-3 border-t border-gray-100 flex items-center justify-end text-xs text-gray-400'>
			<Clock size={12} className='mr-1' /> Còn {daysLeft} ngày
		</div>
	</div>
);
