import { X, Calendar, ChevronDown, Edit2 } from 'lucide-react';

const InfoModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			{/* Modal Container */}
			<div className='bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 pb-2'>
					<h2 className='text-2xl font-bold text-gray-800'>
						Thông tin cá nhân
					</h2>
					<button
						onClick={onClose}
						className='p-1 hover:bg-gray-100 rounded-full transition-colors'
					>
						<X size={24} className='text-gray-500' />
					</button>
				</div>

				{/* Form Body */}
				<div className='p-6 space-y-5 overflow-y-auto max-h-[80vh]'>
					{/* Họ và tên */}
					<div className='space-y-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							Họ và tên <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							defaultValue='Duy Phát'
							className='w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
						/>
					</div>

					{/* Email */}
					<div className='space-y-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							Email <span className='text-red-500'>*</span>
						</label>
						<div className='relative'>
							<input
								type='email'
								disabled
								defaultValue='hatranduyphat2004@gmail.com'
								className='w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none'
							/>
							<Edit2
								size={16}
								className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
							/>
						</div>
					</div>

					{/* Số điện thoại */}
					<div className='space-y-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							Số điện thoại <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							placeholder='Nhập số điện thoại'
							className='w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none'
						/>
					</div>

					{/* Địa chỉ hiện tại */}
					<div className='space-y-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							Địa chỉ hiện tại <span className='text-red-500'>*</span>
						</label>
						<div className='grid grid-cols-2 gap-4'>
							<div className='relative'>
								<select className='w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-gray-400'>
									<option>Chọn tỉnh thành</option>
								</select>
								<ChevronDown
									size={18}
									className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
								/>
							</div>
							<div className='relative'>
								<select className='w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-gray-400'>
									<option>Chọn quận huyện</option>
								</select>
								<ChevronDown
									size={18}
									className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
								/>
							</div>
						</div>
					</div>

					{/* Ngày sinh & Giới tính */}
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-1.5'>
							<label className='text-sm font-medium text-gray-700'>
								Ngày sinh
							</label>
							<div className='relative'>
								<input
									type='text'
									placeholder='DD/MM/YYYY'
									className='w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none'
								/>
								<Calendar
									size={18}
									className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
								/>
							</div>
						</div>

						<div className='space-y-1.5'>
							<label className='text-sm font-medium text-gray-700'>
								Giới tính
							</label>
							<div className='flex gap-2'>
								<button className='flex-1 py-2.5 rounded-full border border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100 transition'>
									Nữ
								</button>
								<button className='flex-1 py-2.5 rounded-full border border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100 transition'>
									Nam
								</button>
							</div>
						</div>
					</div>

					{/* Tình trạng hôn nhân */}
					<div className='space-y-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							Tình trạng hôn nhân
						</label>
						<div className='flex gap-2'>
							<button className='px-6 py-2.5 rounded-full border border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100 transition'>
								Độc thân
							</button>
							<button className='px-6 py-2.5 rounded-full border border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100 transition'>
								Đã lập gia đình
							</button>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className='p-6 border-t border-gray-100 flex justify-end gap-4 items-center'>
					<button
						onClick={onClose}
						className='px-6 py-2.5 font-bold text-purple-700 hover:bg-purple-50 rounded-xl transition'
					>
						Huỷ
					</button>
					<button className='px-8 py-2.5 font-bold bg-[#3F1A9D] text-white rounded-xl hover:bg-opacity-90 transition shadow-lg shadow-purple-200'>
						Lưu thông tin
					</button>
				</div>
			</div>
		</div>
	);
};

export default InfoModal;
