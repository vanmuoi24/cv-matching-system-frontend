import { useState, useEffect, useMemo } from 'react';
import { MapPin, DollarSign, Calendar, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IApplication } from '../../../../../types/TypeApplication';
import { formatSalary } from '../../../../../shared/utils/formatSalary';
import { GetApplicationsByCandidateId } from '../../../../../service/Api/Application/Application';
import { Spin } from 'antd';

const statusLabel: Record<string, string> = {
	all: 'Tất cả',
	submitted: 'Đã ứng tuyển',
	rejected: 'Đã từ chối',
};

const statusStyle: Record<string, string> = {
	all: 'bg-gray-100 text-gray-700 border-gray-200',
	submitted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
	rejected: 'bg-rose-100 text-rose-700 border-rose-200',
};

const HistoryJob = () => {
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [appliedJobs, setAppliedJobs] = useState<IApplication[]>([]);
	const [loading, setLoading] = useState(true);

	const userLocal = localStorage.getItem('user');
	const user = useMemo(
		() => (userLocal ? JSON.parse(userLocal) : null),
		[userLocal],
	);

	useEffect(() => {
		const fetchHistory = async () => {
			if (!user?.id) return;
			try {
				setLoading(true);
				const res = await GetApplicationsByCandidateId(user.id);
				if (res && res.result) {
					setAppliedJobs(res.result);
				}
			} catch (error) {
				console.error('Fetch history error:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchHistory();
	}, [user?.id]);

	const filteredJobs = useMemo(() => {
		if (statusFilter === 'all') return appliedJobs;
		return appliedJobs.filter((app) => {
			const status = (app.status || '').toString().trim().toLowerCase();
			return status === statusFilter.toLowerCase();
		});
	}, [statusFilter, appliedJobs]);

	if (loading) {
		return (
			<div className='min-h-[400px] flex flex-col items-center justify-center gap-4'>
				<Spin size='large' />
				<p className='text-gray-500 font-medium animate-pulse'>
					Đang tải lịch sử ứng tuyển...
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen pb-12 transition-all duration-500'>
			<div className='max-w-6xl mx-auto space-y-8'>
				{/* Header Section */}
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100'>
					<div className='space-y-1'>
						<h1 className='text-3xl font-black text-gray-900 tracking-tight'>
							Lịch sử ứng tuyển
						</h1>
						<p className='text-gray-500 font-medium'>
							Bạn đã ứng tuyển tổng cộng{' '}
							<span className='text-blue-600 font-bold'>
								{appliedJobs.length}
							</span>{' '}
							công việc
						</p>
					</div>

					<div className='flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100'>
						<div className='flex items-center gap-2 px-3 text-gray-400'>
							<Search size={18} />
						</div>
						<select
							className='bg-transparent border-none focus:ring-0 text-gray-700 font-bold pr-8 py-2 cursor-pointer'
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
						>
							{Object.entries(statusLabel).map(([key, label]) => (
								<option key={key} value={key}>
									{label}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Jobs Grid */}
				<AnimatePresence mode='popLayout'>
					{filteredJobs.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='bg-white rounded-3xl shadow-sm p-20 text-center border-2 border-dashed border-gray-100'
						>
							<div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300'>
								<Search size={40} />
							</div>
							<h2 className='text-2xl font-bold text-gray-800 mb-2'>
								Không tìm thấy kết quả
							</h2>
							<p className='text-gray-500 max-w-md mx-auto'>
								Thử thay đổi bộ lọc hoặc ứng tuyển thêm các công việc mới để
								theo dõi tiến độ của bạn nhé!
							</p>
						</motion.div>
					) : (
						<motion.div
							layout
							className='grid md:grid-cols-2 lg:grid-cols-2 gap-6'
						>
							{filteredJobs.map((app) => {
								const status = (app.status || '')
									.toString()
									.trim()
									.toLowerCase();
								return (
									<motion.div
										key={app.id}
										layout
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										whileHover={{
											y: -5,
											boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
										}}
										className=' bg-white rounded-3xl shadow-sm p-8 transition-all border border-gray-100 group'
									>
										<div className='flex justify-between items-start gap-4'>
											<div className='space-y-1 flex-1'>
												<div className='flex items-center gap-2 mb-2'>
													<span className='px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider rounded-lg'>
														{app.job?.category || 'Công việc'}
													</span>
												</div>
												<h3 className='text-xl font-black text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors'>
													{app.job?.title}
												</h3>
												<p className='text-gray-500 font-bold text-sm tracking-tight'>
													{app.job?.company?.name}
												</p>
											</div>

											<span
												className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wide border shadow-sm shrink-0 ${
													statusStyle[status] || statusStyle.submitted
												}`}
											>
												{statusLabel[status] || 'Đã ứng tuyển'}
											</span>
										</div>

										<div className='flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 pb-6 border-b border-gray-50'>
											<div className='flex items-center gap-2 text-[#4fccff] font-black'>
												<div className='w-8 h-8 rounded-lg bg-[#4fccff]/10 flex items-center justify-center'>
													<DollarSign size={16} />
												</div>
												<span className='text-[15px]'>
													{formatSalary(
														app.job?.minSalary || 0,
														app.job?.maxSalary || 0,
													)}
												</span>
											</div>

											<div className='flex items-center gap-2 text-gray-600 font-bold'>
												<div className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center'>
													<MapPin size={16} />
												</div>
												<span className='text-[14px]'>{app.job?.location}</span>
											</div>
										</div>

										<div className='mt-6 pt-4 border-t border-gray-50 flex items-center gap-2 text-gray-400 font-bold text-[12px]'>
											<Calendar size={14} />
											<span>
												Nộp ngày: {new Date(app.appliedAt).toLocaleDateString()}
											</span>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default HistoryJob;
