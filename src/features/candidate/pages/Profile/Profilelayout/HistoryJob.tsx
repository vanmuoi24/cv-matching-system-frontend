import React, { useState, useEffect, useMemo } from 'react';
import { Heart, MapPin, DollarSign, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import type { IApplication } from '../../../../../types/TypeApplication';
import type { IJob } from '../../../../../types/TypeJob';
import { formatSalary } from '../../../../../shared/utils/formatSalary';
import { JobsApi } from '../../../../../service/Api/Job/Job';

// Remove unused Status type

// Remove unused Job type

// Remove fakeAppliedJobs

// Suggested Jobs logic will be dynamic

const statusStyle = {
	pending: 'bg-yellow-100 text-yellow-700',
	interview: 'bg-blue-100 text-blue-700',
	rejected: 'bg-red-100 text-red-700',
	accepted: 'bg-green-100 text-green-700',
};

const statusLabel = {
	pending: 'Đang chờ',
	interview: 'Phòng vấn',
	rejected: 'Từ chối',
	accepted: 'Đã nhận',
};

const HistoryJob = () => {
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [suggestedJobs, setSuggestedJobs] = useState<IJob[]>([]);

	const userLocal = localStorage.getItem('user');
	const user = useMemo(
		() => (userLocal ? JSON.parse(userLocal) : null),
		[userLocal],
	);
	const appliedJobs: IApplication[] = useMemo(
		() => user?.applicationList || [],
		[user],
	);

	useEffect(() => {
		const fetchSuggestions = async () => {
			try {
				const res = await JobsApi();
				if (res.code === 1000 && res.result) {
					const allJobs: IJob[] = res.result;

					// Get applied job IDs
					const appliedJobIds = new Set(appliedJobs.map((app) => app.job?.id));

					// Get frequent categories from applied jobs
					const categories = appliedJobs
						.map((app) => app.job?.category)
						.filter(Boolean);
					const mostFreqCategory =
						categories.length > 0
							? categories
									.sort(
										(a, b) =>
											categories.filter((v) => v === a).length -
											categories.filter((v) => v === b).length,
									)
									.pop()
							: null;

					// Filter suggestions: same category OR recent, and not yet applied
					const filtered = allJobs
						.filter(
							(job) =>
								!appliedJobIds.has(job.id) &&
								(mostFreqCategory ? job.category === mostFreqCategory : true),
						)
						.slice(0, 4);

					setSuggestedJobs(filtered);
				}
			} catch (error) {
				console.error('Fetch suggestions error:', error);
			}
		};
		fetchSuggestions();
	}, [appliedJobs]);

	const filteredJobs = useMemo(() => {
		if (statusFilter === 'all') return appliedJobs;
		return appliedJobs.filter(
			(app) => app.status?.toLowerCase() === statusFilter.toLowerCase(),
		);
	}, [statusFilter, appliedJobs]);

	return (
		<div className=' min-h-screen p-6'>
			<div className='max-w-6xl mx-auto space-y-10'>
				{/* Header */}
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold text-gray-800'>
						Việc làm đã ứng tuyển
					</h1>

					<div className='flex items-center gap-3'>
						<span className='text-gray-600 font-medium'>Bộ lọc:</span>
						<select
							className='border rounded-xl px-4 py-2 bg-white shadow-sm'
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
						>
							<option value='all'>Tất cả</option>
							<option value='pending'>Đang chờ</option>
							<option value='interview'>Phỏng vấn</option>
							<option value='rejected'>Từ chối</option>
							<option value='accepted'>Đã nhận</option>
						</select>
					</div>
				</div>

				{/* Applied Jobs */}
				{filteredJobs.length === 0 ? (
					<div className='bg-white rounded-2xl shadow-sm p-12 text-center'>
						<h2 className='text-xl font-semibold text-gray-600'>
							Không có công việc phù hợp
						</h2>
					</div>
				) : (
					<div className='grid md:grid-cols-2 gap-6'>
						{filteredJobs.map((app) => (
							<motion.div
								key={app.id}
								whileHover={{ scale: 1.02 }}
								className='bg-white rounded-2xl shadow-sm p-6 transition border border-gray-50'
							>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='text-lg font-semibold text-gray-800 line-clamp-1'>
											{app.job?.title}
										</h3>
										<p className='text-gray-600 text-sm mt-1 truncate'>
											{app.job?.company?.name}
										</p>
									</div>

									<span
										className={`px-3 py-1 rounded-full text-xs font-medium ${
											app.status.toLowerCase() === 'pending'
												? statusStyle.pending
												: app.status.toLowerCase() === 'interview'
													? statusStyle.interview
													: app.status.toLowerCase() === 'accepted'
														? statusStyle.accepted
														: statusStyle.rejected
										}`}
									>
										{app.status.toLowerCase() === 'pending'
											? statusLabel.pending
											: app.status.toLowerCase() === 'interview'
												? statusLabel.interview
												: app.status.toLowerCase() === 'accepted'
													? statusLabel.accepted
													: statusLabel.rejected}
									</span>
								</div>

								<div className='flex items-center gap-6 mt-4 text-sm text-gray-600'>
									<div className='flex items-center gap-1 text-purple-600 font-bold'>
										<DollarSign size={16} />
										<span>
											{formatSalary(
												app.job?.minSalary || 0,
												app.job?.maxSalary || 0,
											)}
										</span>
									</div>

									<div className='flex items-center gap-1'>
										<MapPin size={16} />
										{app.job?.location}
									</div>
								</div>

								<div className='mt-4 pt-4 border-t border-gray-50 text-[12px] text-gray-400'>
									Ứng tuyển vào: {new Date(app.appliedAt).toLocaleDateString()}
								</div>
							</motion.div>
						))}
					</div>
				)}

				{/* Suggested Jobs */}
				<div>
					<div className='flex items-center gap-2 mb-4'>
						<Lightbulb className='text-blue-500' />
						<h2 className='text-2xl font-bold text-gray-800'>Việc làm gợi ý</h2>
					</div>

					<div className='grid md:grid-cols-2 gap-6'>
						{suggestedJobs.map((job) => (
							<motion.div
								key={job.id}
								whileHover={{ scale: 1.02 }}
								className='bg-white rounded-2xl shadow-sm p-6 border border-gray-50'
							>
								<div className='flex justify-between'>
									<div>
										<h3 className='text-lg font-semibold text-gray-800 line-clamp-1'>
											{job.title}
										</h3>
										<p className='text-gray-600 text-sm mt-1 truncate'>
											{job.company?.name}
										</p>
									</div>

									<Heart className='text-gray-400 hover:text-red-500 cursor-pointer transition' />
								</div>

								<div className='flex items-center gap-6 mt-4 text-sm text-gray-600'>
									<div className='flex items-center gap-1 text-purple-600 font-bold'>
										<DollarSign size={16} />
										<span>{formatSalary(job.minSalary, job.maxSalary)}</span>
									</div>

									<div className='flex items-center gap-1'>
										<MapPin size={16} />
										{job.location}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryJob;
