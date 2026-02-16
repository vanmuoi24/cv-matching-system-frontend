import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ChangeEmailModal from '../Modal/ChangeMailModal';
import { useState } from 'react';
import ChangePasswordModal from '../Modal/ChangePasswordModal';

const Account = () => {
	const userData = JSON.parse(localStorage.getItem('user') || '{}');
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

	return (
		<div className='w-full max-w-5xl mx-auto p-4'>
			{/* Tiêu đề */}
			<h2 className='text-xl font-bold text-gray-800 mb-6'>
				Quản lý tài khoản
			</h2>

			{/* Card chứa thông tin */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8'>
				<div className='flex flex-col gap-6'>
					<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
						{/* Label */}
						<div className='w-full md:w-1/6'>
							<span className='font-semibold text-gray-700'>Email</span>
						</div>

						{/* Input Area & Status */}
						<div className='flex-1 flex items-center gap-3'>
							{/* Box hiển thị email */}
							<div className='bg-gray-50 rounded-lg h-10 w-full md:max-w-md flex items-center justify-between px-4 text-gray-600 border border-transparent hover:border-gray-200 transition-colors'>
								<span>{userData?.email || 'Chưa có email'}</span>
							</div>
						</div>

						{/* Nút sửa */}
						<div className='w-full md:w-auto flex justify-end'>
							<Button
								type='text'
								icon={<EditOutlined />}
								className='!bg-purple-50 !text-purple-700 hover:!bg-purple-100 hover:!text-purple-800 font-medium rounded-lg h-10 px-6 border-none min-w-[170px]'
								onClick={() => setIsEmailModalOpen(true)}
							>
								Sửa email
							</Button>
						</div>
					</div>

					<div className='flex flex-col md:flex-row md:items-center gap-4'>
						{/* Label */}
						<div className='w-full md:w-1/6'>
							<span className='font-semibold text-gray-700'>Mật khẩu</span>
						</div>

						{/* Nút sửa */}
						<div className='w-full md:w-auto flex justify-end'>
							<Button
								type='text'
								icon={<EditOutlined />}
								className='!bg-purple-50 !text-purple-700 hover:!bg-purple-100 hover:!text-purple-800 font-medium rounded-lg h-10 px-4 border-none'
								onClick={() => setIsPasswordModalOpen(true)}
							>
								Đổi mật khẩu
							</Button>
						</div>
					</div>
				</div>
			</div>
			<ChangeEmailModal
				isOpen={isEmailModalOpen}
				onClose={() => setIsEmailModalOpen(false)}
				currentEmail={userData.email}
			/>
			<ChangePasswordModal
				isOpen={isPasswordModalOpen}
				onClose={() => setIsPasswordModalOpen(false)}
			/>
		</div>
	);
};

export default Account;
