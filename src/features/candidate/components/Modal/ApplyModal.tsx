import React, { useState } from 'react';
import { Modal, Button, Input, Form, Upload, Avatar, Radio } from 'antd';
import { UploadOutlined, CloseOutlined, FileTextOutlined } from '@ant-design/icons';
import type { IJob } from '../../../../types/TypeJob';
import { CreateApplication } from '../../../../service/Api/Application/Application';
import { UpdateCandidateProfile, CreateCandidateProfile } from '../../../../service/Api/CandidateProfile/CandidateProfileAPI';
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
	const [cvMethod, setCvMethod] = useState<'existing' | 'new'>(user?.profile?.cvFileUrl ? 'existing' : 'new');

	const onFinish = async (values: any) => {
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
			// Handle CV upload if choosing to upload new
			if (cvMethod === 'new') {
				const newFile = values.cv?.fileList?.[0]?.originFileObj || values.cv?.file;
				if (!newFile) {
					toast.error('Vui lòng tải lên file CV PDF!');
					setLoading(false);
					return;
				}

				let freshProfile = null;
				if (user.profile) {
					const updateFormData = new FormData();
					updateFormData.append("cvFile", newFile);
					const res = await UpdateCandidateProfile(user.id, updateFormData);
					if (res.code === 1000) freshProfile = res.result;
				} else {
					const createFormData = new FormData();
					createFormData.append("userId", user.id.toString());
					createFormData.append("skills", "Chưa cập nhật");
					createFormData.append("cvFile", newFile);
					const res = await CreateCandidateProfile(createFormData);
					if (res.code === 1000) freshProfile = res.result;
				}

				if (freshProfile) {
					const updatedUser = { ...user, profile: freshProfile };
					localStorage.setItem("user", JSON.stringify(updatedUser));
					toast.success('Hồ sơ đã được cập nhật CV mới!');
				} else {
					toast.error('Có lỗi khi upload CV mới, ứng tuyển bị hủy.');
					setLoading(false);
					return;
				}
			}

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
						{user?.profile?.cvFileUrl && (
						  <Radio.Group 
                            value={cvMethod} 
                            onChange={e => setCvMethod(e.target.value)}
                            className="mb-4 flex gap-4"
                          >
							<Radio value="existing">Sử dụng CV đã lưu trong hồ sơ</Radio>
							<Radio value="new">Tải lên CV mới</Radio>
						  </Radio.Group>
                        )}

                        {cvMethod === 'existing' && user?.profile?.cvFileUrl ? (
                            <div className="p-4 bg-purple-50 rounded-xl flex items-center gap-3 border border-purple-100 mb-4 transition-all">
                                <FileTextOutlined className="text-2xl text-purple-600" />
                                <div>
                                    <p className="font-bold text-gray-700">CV hiện tại của bạn</p>
                                    <a href={user.profile.cvFileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                                        Xem trước CV
                                    </a>
                                </div>
                            </div>
                        ) : (
							<Form.Item name='cv' className='mb-2' rules={[{ required: true, message: 'Vui lòng tải lên CV!' }]}>
								<Upload.Dragger
									maxCount={1}
									beforeUpload={(file) => {
										if (file.type !== 'application/pdf') {
											toast.error('Chỉ hỗ trợ file định dạng PDF');
											return Upload.LIST_IGNORE;
										}
										return false;
									}}
									accept=".pdf"
									className='bg-purple-50/30 rounded-2xl py-6 transition-all'
								>
									<div className='flex flex-col items-center gap-2'>
										<div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1'>
											<UploadOutlined className='text-purple-600 text-xl' />
										</div>
										<p className='text-purple-700 font-bold text-lg'>
											Tải file PDF lên từ máy tính
										</p>
										<p className='text-gray-400 text-sm'>
											Hỗ trợ định dạng pdf, tối đa 5MB
										</p>
										<p className='text-orange-500 text-xs mt-2'>
                                            * File mới sẽ tự động cập nhật lại CV chính trong hồ sơ của bạn
                                        </p>
									</div>
								</Upload.Dragger>
							</Form.Item>
						)}
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
