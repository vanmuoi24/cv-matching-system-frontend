import React, { useState } from 'react';
import { Modal, Button, Input, Form, Upload, Avatar } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import type { IJob } from '../../../../types/TypeJob';
import { CreateApplication } from '../../../../service/Api/Application/Application';
import { toast } from 'react-toastify';

interface ApplyModalProps {
	isOpen: boolean;
	onClose: () => void;
	job: IJob;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, job }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const userLocal = localStorage.getItem('user');
	const user = userLocal ? JSON.parse(userLocal) : null;

	const onFinish = async (values: any) => {
		console.log(values);
		if (!user) {
			toast.error('Vui lòng đăng nhập để ứng tuyển');
			return;
		}

		// Check if already applied
		const isAlreadyApplied = job.applicationList?.some(app => app.candidate?.id === user.id);
		if (isAlreadyApplied) {
			toast.warning('Bạn đã ứng tuyển công việc này rồi!');
			return;
		}

		setLoading(true);
		try {
			const requestBody = {
				candidateId: user.id,
				jobId: job.id,
				similarityScore: 0,
				status: 'PENDING',
				appliedAt: new Date().toISOString(),
			};

			const res = await CreateApplication(requestBody);
			if (res.code === 1000) {
				toast.success('Ứng tuyển thành công!');
				onClose();
			} else {
				toast.error(res.message || 'Có lỗi xảy ra, vui lòng thử lại');
			}
		} catch (error) {
			console.error('Apply error:', error);
			toast.error('Gửi yêu cầu ứng tuyển thất bại');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title={null}
			open={isOpen}
			onCancel={onClose}
			footer={null}
			width={700}
			closeIcon={<CloseOutlined className='text-xl' />}
			className='apply-modal'
			centered
		>
			<div className=''>
				{/* Header */}
				<div className='mb-6'>
					<h2 className='text-xl font-bold text-gray-800 mb-4'>
						Ứng tuyển vào vị trí
					</h2>
					<div className='flex gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-100'>
						<Avatar
							shape='square'
							size={64}
							src={job.company?.logoUrl}
							className='bg-white border border-gray-100 shrink-0'
						>
							{!job.company?.logoUrl && job.company?.name?.charAt(0)}
						</Avatar>
						<div className='flex-1 min-w-0'>
							<h3 className='font-bold text-gray-800 text-lg line-clamp-1'>
								{job.title}
							</h3>
							<p className='text-gray-500 text-sm truncate'>
								{job.company?.name}
							</p>
						</div>
					</div>
				</div>

				<Form
					form={form}
					layout='vertical'
					initialValues={{
						fullName: user?.fullName || '',
						email: user?.email || '',
					}}
					onFinish={onFinish}
					className='apply-form'
				>
					<div className='mb-3'>
						<h4 className='text-lg font-bold text-gray-800 mb-2'>
							Thông tin ứng tuyển
						</h4>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Form.Item
								label={
									<span className='font-semibold text-gray-600'>
										Họ và tên <span className='text-red-500'>*</span>
									</span>
								}
								name='fullName'
							>
								<Input
									size='large'
									className='bg-gray-50 border-none h-10 rounded-xl'
									placeholder='Nhập họ và tên'
								/>
							</Form.Item>
							<Form.Item
								label={
									<span className='font-semibold text-gray-600'>
										Email <span className='text-red-500'>*</span>
									</span>
								}
								name='email'
							>
								<Input
									size='large'
									className='bg-gray-50 border-none h-10 rounded-xl'
									placeholder='Nhập email'
								/>
							</Form.Item>
						</div>
						<Form.Item
							label={
								<span className='font-semibold text-gray-600'>
									Số điện thoại <span className='text-red-500'>*</span>
								</span>
							}
							name='phone'
							rules={[
								{ required: true, message: 'Vui lòng nhập số điện thoại' },
							]}
						>
							<Input
								size='large'
								className='h-10 rounded-xl focus:border-purple-600'
								placeholder='Nhập số điện thoại'
							/>
						</Form.Item>
					</div>

					<div className='mb-3'>
						<h4 className='text-lg font-bold text-gray-800 mb-2'>
							CV ứng tuyển
						</h4>
						<Form.Item name='cv' className='mb-2'>
							<Upload.Dragger
								maxCount={1}
								className='bg-purple-50/30 rounded-2xl py-6 transition-all'
							>
								<div className='flex flex-col items-center gap-2'>
									<div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1'>
										<UploadOutlined className='text-purple-600 text-xl' />
									</div>
									<p className='text-purple-700 font-bold text-lg'>
										Tải lên CV có sẵn
									</p>
									<p className='text-gray-400 text-sm'>
										Hỗ trợ định dạng: doc, docx, pdf, tối đa 5MB
									</p>
								</div>
							</Upload.Dragger>
						</Form.Item>
					</div>

					<div className='text-[13px] text-gray-500 mb-3 leading-relaxed'>
						Bằng việc nhấn nút nộp hồ sơ tôi đồng ý chia sẻ thông tin cá nhân
						của mình với nhà tuyển dụng theo các{' '}
						<a href='#' className='text-blue-600 hover:underline'>
							Điều khoản sử dụng
						</a>
						,{' '}
						<a href='#' className='text-blue-600 hover:underline'>
							Chính sách bảo mật
						</a>{' '}
						và{' '}
						<a href='#' className='text-blue-600 hover:underline'>
							Chính sách dữ liệu cá nhân
						</a>{' '}
						của Vieclam24h
					</div>

					<div className='border-t border-gray-100 pt-6 mt-6'>
						{/* <div className='flex items-center justify-between mb-6'>
							<div className='flex items-center gap-3'>
								<Switch defaultChecked className='bg-gray-300' />
								<span className='font-medium text-gray-700'>
									Nhận thông báo việc làm tương tự
								</span>
							</div>
						</div> */}
						<Button
							type='primary'
							htmlType='submit'
							size='large'
							block
							loading={loading}
							disabled={loading || job.applicationList?.some(app => app.candidate?.id === user?.id)}
							className={`h-14 font-bold text-lg rounded-xl shadow-lg border-none ${
								job.applicationList?.some(app => app.candidate?.id === user?.id)
								? 'bg-gray-400! hover:bg-gray-400!' 
								: 'bg-[#451fa3]! hover:bg-[#2f0d7b]!'
							}`}
						>
							{job.applicationList?.some(app => app.candidate?.id === user?.id) 
							? 'Đã ứng tuyển' 
							: 'Ứng tuyển ngay'}
						</Button>
					</div>
				</Form>
			</div>
		</Modal>
	);
};

export default ApplyModal;
