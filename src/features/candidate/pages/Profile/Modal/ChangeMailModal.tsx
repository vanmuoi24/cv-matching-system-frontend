import React from 'react';
import { Modal, Input, Button } from 'antd';

interface ChangeEmailModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentEmail: string;
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({
	isOpen,
	onClose,
	currentEmail,
}) => {
	return (
		<Modal
			title={
				<div className='text-xl font-bold text-gray-800 mb-1'>
					Thay đổi email
				</div>
			}
			open={isOpen}
			onCancel={onClose}
			footer={null} // Tắt footer mặc định để tự custom giống thiết kế
			centered
			width={550}
			className='p-0'
			styles={{
				content: { borderRadius: '16px', padding: '24px' },
			}}
		>
			<div className='flex flex-col gap-6 mt-6'>
				{/* Email hiện tại */}
				<div className='flex flex-col gap-2'>
					<label className='font-semibold text-gray-700 text-sm'>
						Email hiện tại <span className='text-red-500'>*</span>
					</label>
					<div className='bg-gray-100 text-gray-500 rounded-lg px-4 py-2.5 h-11 flex items-center border border-transparent'>
						{currentEmail}
					</div>
				</div>

				{/* Email mới */}
				<div className='flex flex-col gap-2'>
					<label className='font-semibold text-gray-700 text-sm'>
						Email mới <span className='text-red-500'>*</span>
					</label>
					<Input
						placeholder='Nhập email mới'
						className='h-11 rounded-lg border-gray-300 hover:border-[#3C1E96] focus:border-[#3C1E96]'
					/>
				</div>

				{/* Action Buttons */}
				<div className='flex gap-4 mt-4 pt-2'>
					<Button
						className='flex-1 h-11 rounded-lg font-bold text-base border-none bg-purple-50 text-[#3C1E96] hover:!bg-purple-100 hover:!text-[#3C1E96]'
						onClick={onClose}
					>
						Hủy bỏ
					</Button>
					<Button
						type='primary'
						className='flex-1 h-11 rounded-lg font-bold text-base  bg-[#3C1E96]! hover:bg-[#2a156b]! border-none'
					>
						Lưu email mới
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ChangeEmailModal;
