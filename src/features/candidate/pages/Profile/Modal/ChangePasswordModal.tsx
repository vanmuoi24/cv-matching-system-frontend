import React from 'react';
import { Modal, Input, Button } from 'antd';

interface ChangePasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal
			title={
				<div className='text-xl font-bold text-gray-800 mb-1'>Đổi mật khẩu</div>
			}
			open={isOpen}
			onCancel={onClose}
			footer={null}
			centered
			width={550}
			className='p-0'
			styles={{
				content: { borderRadius: '16px', padding: '24px' },
			}}
		>
			<div className='flex flex-col gap-5 mt-6'>
				{/* Mật khẩu hiện tại */}
				<div className='flex flex-col gap-2'>
					<label className='font-semibold text-gray-700 text-sm'>
						Mật khẩu hiện tại <span className='text-red-500'>*</span>
					</label>
					<Input.Password
						placeholder='Nhập mật khẩu hiện tại'
						className='h-11 rounded-lg border-gray-300 hover:border-[#3C1E96] focus:border-[#3C1E96]'
					/>
				</div>

				{/* Mật khẩu mới */}
				<div className='flex flex-col gap-2'>
					<label className='font-semibold text-gray-700 text-sm'>
						Mật khẩu mới <span className='text-red-500'>*</span>
					</label>
					<Input.Password
						placeholder='Nhập mật khẩu mới'
						className='h-11 rounded-lg border-gray-300 hover:border-[#3C1E96] focus:border-[#3C1E96]'
					/>
				</div>

				{/* Nhập lại mật khẩu mới */}
				<div className='flex flex-col gap-2'>
					<label className='font-semibold text-gray-700 text-sm'>
						Nhập lại mật khẩu mới <span className='text-red-500'>*</span>
					</label>
					<Input.Password
						placeholder='Nhập lại mật khẩu mới'
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
						className='flex-1 h-11 rounded-lg text-base bg-[#3C1E96]! hover:!bg-[#2a156b] border-none'
					>
						Cập nhật mật khẩu
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ChangePasswordModal;
