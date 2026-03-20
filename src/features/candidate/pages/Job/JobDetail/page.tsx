import React, { useEffect, useState } from 'react';
import { Button, Tag, Avatar, Divider, Typography } from 'antd';
import {
	DollarOutlined,
	EnvironmentOutlined,
	ClockCircleOutlined,
	TrophyOutlined,
	HeartOutlined,
	SendOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import Container from '../../../../../shared/components/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { JobApiById, JobsApi } from '../../../../../service/Api/Job/Job';
import type { IJob } from '../../../../../types/TypeJob';
import { formatSalary } from '../../../../../shared/utils/formatSalary';
import {
	CalendarOutlined,
	GlobalOutlined,
	SafetyCertificateOutlined,
} from '@ant-design/icons';
import ApplyModal from '../../../components/Modal/ApplyModal';

const { Title } = Typography;

// --- Component Chính ---
const JobDetail: React.FC = () => {
	const { jobId } = useParams();
	const navigate = useNavigate();
	const [jobDetail, setJobDetail] = useState<IJob | null>(null);
	const [similarJobs, setSimilarJobs] = useState<IJob[]>([]);
	const [loading, setLoading] = useState(true);
	const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
	const userLocal = localStorage.getItem('user');
	const user = userLocal ? JSON.parse(userLocal) : null;

	const isAlreadyApplied = jobDetail?.applicationList?.some(
		(app) => app.candidate?.id === user?.id,
	);

	useEffect(() => {
		const fetchDetail = async () => {
			setLoading(true);
			try {
				const res = await JobApiById(jobId!);
				if (res.code === 1000 && res.result) {
					setJobDetail(res.result);

					// Fetch similar jobs (same category)
					const allRes = await JobsApi();
					if (allRes.code === 1000 && allRes.result) {
						const filtered = (allRes.result as IJob[])
							.filter(
								(j) =>
									j.category === res.result.category && j.id !== res.result.id,
							)
							.slice(0, 3);
						setSimilarJobs(filtered);
					}
				}
			} catch (error) {
				console.error('Error fetching job details:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchDetail();
	}, [jobId]);

	useEffect(() => {
		window.scrollTo({
			top: 100,
			behavior: 'smooth',
		});
	}, []);
	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-pulse text-purple-600 font-semibold'>
					Đang tải dữ liệu...
				</div>
			</div>
		);
	}

	if (!jobDetail) {
		return (
			<div className='p-20 text-center'>Không tìm thấy thông tin công việc</div>
		);
	}

	return (
		<div className='bg-gray-50/50 min-h-screen pb-20 mt-5'>
			<Container>
				{/* === Header Section === */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
					<div className='flex gap-6 items-start'>
						<Avatar
							shape='square'
							size={100}
							src={jobDetail.company?.logoUrl}
							className='bg-gray-100 text-purple-700 font-bold text-4xl shrink-0 border border-gray-100'
						>
							{!jobDetail.company?.logoUrl &&
								jobDetail.company?.name?.charAt(0)}
						</Avatar>
						<div className='flex-1'>
							<Title
								level={2}
								className='mb-2! mt-0! text-gray-800 line-clamp-2'
							>
								{jobDetail.title}
							</Title>
							<div className='text-lg text-purple-700 font-semibold mb-4'>
								{jobDetail.company?.name}
							</div>

							<div className='flex flex-wrap gap-4 text-gray-600'>
								<Tag
									icon={<DollarOutlined />}
									color='blue'
									className='px-3 py-1 text-sm border-none bg-blue-50 text-blue-700 font-medium'
								>
									{formatSalary(jobDetail.minSalary, jobDetail.maxSalary)}
								</Tag>
								<Tag
									icon={<EnvironmentOutlined />}
									color='default'
									className='px-3 py-1 text-sm border-none bg-gray-100'
								>
									{jobDetail.location}
								</Tag>
								<Tag
									icon={<ClockCircleOutlined />}
									color={jobDetail.status === 'OPEN' ? 'success' : 'default'}
									className={`px-3 py-1 text-sm border-none font-medium ${jobDetail.status === 'OPEN' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}
								>
									{jobDetail.status === 'OPEN'
										? 'Đang tuyển'
										: 'Hết hạn hoặc Tạm dừng'}
								</Tag>
							</div>
						</div>
						<div className='hidden lg:flex flex-col gap-3 min-w-[200px]'>
							<Button
								type='primary'
								size='large'
								icon={<SendOutlined />}
								disabled={isAlreadyApplied}
								className={`w-full h-12 font-bold ${isAlreadyApplied ? 'bg-gray-400! hover:bg-gray-400!' : 'bg-[#451fa3]! hover:!bg-[#2f0d7b]!'}`}
								onClick={() => setIsApplyModalOpen(true)}
							>
								{isAlreadyApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'}
							</Button>
							{/* <Button
								size='large'
								icon={<HeartOutlined />}
								className='w-full text-[#451fa3] border-[#451fa3] h-12 hover:!text-[#2f0d7b] hover:!border-[#2f0d7b]'
							>
								Lưu tin
							</Button> */}
						</div>
					</div>

					<div className='mt-6 lg:hidden flex gap-3'>
						<Button
							type='primary'
							block
							size='large'
							disabled={isAlreadyApplied}
							className={isAlreadyApplied ? 'bg-gray-400!' : 'bg-[#451fa3]!'}
							onClick={() => setIsApplyModalOpen(true)}
						>
							{isAlreadyApplied ? 'Đã ứng tuyển' : 'Ứng tuyển'}
						</Button>
						<Button block size='large'>
							Lưu tin
						</Button>
					</div>
				</div>

				{/* === Main Layout === */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* --- LEFT COLUMN --- */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Job Content */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8'>
							<section className='mb-10'>
								<Title
									level={4}
									className='!mb-6 flex items-center gap-2 text-gray-800'
								>
									<div className='w-1.5 h-6 bg-purple-600 rounded-full'></div>
									Chi tiết công việc
								</Title>
								<div
									className='text-gray-700 leading-relaxed whitespace-pre-line'
									dangerouslySetInnerHTML={{
										__html: jobDetail.description || 'Đang cập nhật',
									}}
								/>
							</section>

							<section>
								<Title
									level={4}
									className='mb-6! flex items-center gap-2 text-gray-800'
								>
									<div className='w-1.5 h-6 bg-purple-600 rounded-full'></div>
									Yêu cầu ứng viên
								</Title>
								<div className='bg-purple-50/30 p-6 rounded-2xl border border-purple-100/50 relative overflow-hidden'>
									<div className='absolute left-0 top-0 w-1 h-full bg-purple-600/20'></div>
									<div
										className='text-gray-700 leading-relaxed whitespace-pre-line text-[15px]'
										dangerouslySetInnerHTML={{
											__html: jobDetail.requirement || 'Đang cập nhật',
										}}
									/>
								</div>
							</section>
						</div>

						{/* Skills Tags */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8'>
							<Title level={4} className='!mb-6'>
								Kỹ năng & Chuyên môn
							</Title>
							<div className='flex flex-wrap gap-3'>
								{(jobDetail.skills || '')
									.replace(/[\[\]"]/g, '') // Loại bỏ ngoặc vuông [ ] và dấu ngoặc kép "
									.split(',')
									.map((skill, idx) => {
										const cleanSkill = skill.trim();
										if (!cleanSkill) return null;
										return (
											<div
												key={idx}
												className='flex items-center gap-2 px-4 py-2 bg-linear-to-br from-white to-purple-50 border border-purple-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-default'
											>
												<div className='w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform'></div>
												<span className='text-sm font-semibold text-gray-700 group-hover:text-purple-700 transition-colors'>
													{cleanSkill}
												</span>
											</div>
										);
									}) || <span className='text-gray-400'>Đang cập nhật</span>}
							</div>
						</div>
					</div>

					{/* --- RIGHT COLUMN --- */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Company Card */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
							<div className='h-2 bg-gradient-to-r from-purple-500 to-blue-500'></div>
							<div className='p-6 text-center'>
								<Avatar
									size={80}
									src={jobDetail.company?.logoUrl}
									className='mb-4 shadow-md bg-gray-50'
								>
									{!jobDetail.company?.logoUrl &&
										jobDetail.company?.name?.charAt(0)}
								</Avatar>
								<h3 className='font-bold text-xl text-gray-800 mb-1 hover:text-purple-700 transition-colors cursor-pointer'>
									{jobDetail.company?.name}
								</h3>
							</div>
							<div className='px-6 pb-6 space-y-4'>
								<div className='flex gap-3 text-sm text-gray-600 border-t border-gray-50 pt-4'>
									<EnvironmentOutlined className='text-purple-500 mt-1' />
									<span>
										{jobDetail.company?.website || 'Hồ Chí Minh, Việt Nam'}
									</span>
								</div>
								<div className='flex gap-3 text-sm text-gray-600'>
									<GlobalOutlined className='text-purple-500 mt-1' />
									<a
										href={jobDetail.company?.website}
										target='_blank'
										rel='noreferrer'
										className='text-blue-600 hover:underline'
									>
										{jobDetail.company?.website || 'Trang web công ty'}
									</a>
								</div>
								<Button
									block
									className='mt-4 h-10 border-purple-200 text-purple-700 hover:bg-purple-50'
								>
									Xem trang công ty
								</Button>
							</div>
						</div>

						{/* General Info */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
							<Title level={4} className='!mb-6'>
								Thông tin chung
							</Title>
							<div className='space-y-5'>
								<div className='flex items-start gap-4'>
									<div className='p-2 bg-blue-50 rounded-lg text-blue-600'>
										<CalendarOutlined />
									</div>
									<div>
										<div className='text-xs text-gray-400 uppercase font-bold tracking-wider'>
											Ngày đăng
										</div>
										<div className='font-medium text-gray-700'>
											{new Date(jobDetail.createAt).toLocaleDateString()}
										</div>
									</div>
								</div>
								<div className='flex items-start gap-4'>
									<div className='p-2 bg-green-50 rounded-lg text-green-600'>
										<SafetyCertificateOutlined />
									</div>
									<div>
										<div className='text-xs text-gray-400 uppercase font-bold tracking-wider'>
											Ngành nghề
										</div>
										<div className='font-medium text-gray-700'>
											{jobDetail.category}
										</div>
									</div>
								</div>
								<div className='flex items-start gap-4'>
									<div className='p-2 bg-orange-50 rounded-lg text-orange-600'>
										<TeamOutlined />
									</div>
									<div>
										<div className='text-xs text-gray-400 uppercase font-bold tracking-wider'>
											Cấp bậc
										</div>
										<div className='font-medium text-gray-700'>Nhân viên</div>
									</div>
								</div>
							</div>
						</div>

						{/* Similar Jobs */}
						{similarJobs.length > 0 && (
							<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
								<Title level={4} className='!mb-6'>
									Việc làm tương tự
								</Title>
								<div className='space-y-4'>
									{similarJobs.map((similar) => (
										<div
											key={similar.id}
											onClick={() => navigate(`/ca/job/${similar.id}`)}
											className='group cursor-pointer'
										>
											<h5 className='font-bold text-gray-800 group-hover:text-purple-700 transition line-clamp-1'>
												{similar.title}
											</h5>
											<div className='text-xs text-gray-500 mt-1 mb-2'>
												{similar.company?.name}
											</div>
											<div className='flex items-center justify-between'>
												<span className='text-purple-700 font-bold text-xs'>
													{formatSalary(similar.minSalary, similar.maxSalary)}
												</span>
												<span className='text-[10px] text-gray-400 italic'>
													{similar.location}
												</span>
											</div>
											<Divider className='my-3' />
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</Container>

			{jobDetail && (
				<ApplyModal
					isOpen={isApplyModalOpen}
					onClose={() => setIsApplyModalOpen(false)}
					job={jobDetail}
				/>
			)}
		</div>
	);
};

export default JobDetail;
