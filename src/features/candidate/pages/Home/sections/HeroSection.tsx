import { useEffect, useMemo, useState } from 'react';
import { JobsApi } from '../../../../../service/Api/Job/Job';
import type { IJob } from '../../../../../types/TypeJob';
import {
	AutoComplete,
	Button,
	Input,
	Select,
	TreeSelect,
	type SelectProps,
	type TreeSelectProps,
} from 'antd';
import useDebounce from '../../../../../shared/hooks/useDebounce';

import searchIcon from '../../../../../assets/icons/searchIcon.png';
import fileRemoveIcon from '../../../../../assets/icons/fileRemoveIcon.png';
import thunderIcon from '../../../../../assets/icons/thunderIcon.png';
import googleIcon from '../../../../../assets/icons/googleIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../../../../shared/components/Container';

const { SHOW_PARENT } = TreeSelect;

const HeroSection = () => {
	const navigate = useNavigate();
	const [professions, setProfessions] = useState<string[]>([]);
	const [place, setPlace] = useState<string | undefined>(undefined);
	const [professionOptions, setProfessionOptions] = useState<
		TreeSelectProps['treeData']
	>([]);
	const [placeOptions, setPlaceOptions] = useState<
		{ label: string; value: string }[]
	>([]);
	const [allJobs, setAllJobs] = useState<IJob[]>([]);
	const [jobTitleValue, setJobTitleValue] = useState<string>('');
	const debouncedJobTitle = useDebounce(jobTitleValue, 500);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await JobsApi();
				console.log('Jobs API response:', response);
				if (response.result) {
					const jobs: IJob[] = response.result;
					setAllJobs(jobs);

					// Extract unique categories
					const uniqueCategories = [
						...new Set(jobs.map((job) => job.category).filter(Boolean)),
					];
					const categoryOptions = uniqueCategories.map((cat) => ({
						title: cat,
						value: cat,
						key: cat,
					}));
					setProfessionOptions(categoryOptions);

					// Extract unique locations
					const uniqueLocations = [
						...new Set(jobs.map((job) => job.location).filter(Boolean)),
					];
					const locationOptions = uniqueLocations.map((loc) => ({
						label: loc!,
						value: loc!,
					}));
					setPlaceOptions(locationOptions);
				}
			} catch (error) {
				console.error('Error fetching jobs:', error);
			}
		};

		fetchJobs();
	}, []);

	const jobTitleOptions = useMemo(() => {
		if (debouncedJobTitle) {
			const suggestions = allJobs
				.filter((job) =>
					job.title.toLowerCase().includes(debouncedJobTitle.toLowerCase()),
				)
				.map((job) => ({ value: job.title }));
			// Remove duplicates
			const uniqueSuggestions = Array.from(
				new Set(suggestions.map((s) => s.value)),
			).map((value) => ({ value }));
			return uniqueSuggestions;
		}
		return [];
	}, [debouncedJobTitle, allJobs]);

	const onChangeProfessions = (newValue: string[]) => {
		console.log('onChange ', newValue);
		setProfessions(newValue);
	};

	const onChangePlace = (value: string) => {
		console.log('onChangePlace ', value);
		setPlace(value);
	};
	const onSearchPlace = (value: string) => {
		console.log('onSearchPlace ', value);
	};
	const tProps: TreeSelectProps = {
		treeData: professionOptions,
		value: professions,
		onChange: onChangeProfessions,
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: 'Chọn ngành nghề',
		allowClear: true,
		style: {
			width: '100%',
		},
	};
	const sProps: SelectProps = {
		showSearch: true,
		optionFilterProp: 'label',
		onSearch: onSearchPlace,
		placeholder: 'Chọn địa điểm làm việc',
		onChange: onChangePlace,
		value: place,
		allowClear: true,
		options: placeOptions,
		style: {
			width: '100%',
		},
	};
	const handleSearch = () => {
		const queryParams = new URLSearchParams();
		if (jobTitleValue) queryParams.set('title', jobTitleValue);
		if (place) queryParams.set('location', place);
		if (professions && professions.length > 0) {
			queryParams.set('categories', professions.join(','));
		}

		navigate(`/ca/job?${queryParams.toString()}`);
	};

	return (
		<div className='bg-[#ede7ff] py-10'>
			<Container>
				<div className='flex gap-10'>
					<div className='flex-7'>
						<div>
							<p className='block text-3xl font-bold'>
								670.000+ người đã ứng tuyển thành công!
							</p>
							<p className='block text-[18px] font-semibold mt-3'>
								Nhanh hơn. Dễ dàng hơn.
							</p>
						</div>
						<span className='block w-full h-px bg-gray-300 my-3'></span>
						<div className=' flex items-center shadow-lg p-2 py-3 rounded-[48px] bg-white border border-gray-200 cursor-pointer h-[65px]'>
							<div className='flex-2 '>
								<AutoComplete
									options={jobTitleOptions}
									value={jobTitleValue}
									onChange={(value) => setJobTitleValue(value)}
									style={{ width: '100%' }}
									className='text-[14px]! font-medium custom-autocomplete'
								>
									<Input
										className='text-[14px]! font-medium border-none!'
										placeholder='Nhập vị trí bạn muốn ứng tuyển'
										prefix={
											<img className='w-4 mr-2' src={searchIcon} alt='' />
										}
										bordered={false}
									/>
								</AutoComplete>
							</div>
							<div className='flex-2  border-l border-r border-gray-200'>
								<TreeSelect
									className='text-[14px]! font-medium '
									{...tProps}
									bordered={false}
								/>
							</div>
							<div className='flex-2 '>
								<Select
									className='text-[14px]! font-medium border-none!'
									{...sProps}
									bordered={false}
								/>
							</div>
							<div className='flex-1 h-full'>
								<Button
									type='primary'
									onClick={handleSearch}
									className='rounded-3xl! cursor-pointer hover:bg-[#260b70]! text-[14px]! font-semibold! bg-[#451fa3]! w-full! h-full!'
								>
									Tìm kiếm
								</Button>
							</div>
						</div>
						<div className='flex items-center gap-2 mt-8 '>
							<div className='bg-white px-2 py-3 rounded-[48px] flex-1 flex items-center justify-center gap-2'>
								<img src={thunderIcon} alt='' />
								<p className='text-[#f9bd00] font-medium'>Việc đi làm ngay</p>
								<span className='bg-[#ef4444] text-white text-[10px] px-2 rounded-[10px]'>
									Mới
								</span>
							</div>

							<div className='bg-white px-2 py-3 rounded-[48px] flex-1 flex items-center justify-center gap-2'>
								<img src={fileRemoveIcon} alt='' />
								<p className='text-[#6384ef] font-medium'>Việc không cần CV</p>
								<span className='bg-[#ef4444] text-white text-[10px] px-2 rounded-[10px]'>
									Mới
								</span>
							</div>
						</div>
					</div>

					{!localStorage.getItem('user') && (
						<div className='flex-3'>
							<div className='bg-linear-to-br linear-gradient from-[#906cf2] to-[#bda8f9] rounded-2xl p-2 pt-8'>
								<div className=' p-4 rounded-2xl bg-white'>
									<p className='text-xl font-semibold mb-3'>
										Đăng nhập để xem ngay việc làm phù hợp hơn!
									</p>
									<p className='text-[14px] font-medium mb-3'>
										Việc làm sẽ được gợi ý theo <strong>vị trí</strong>,{' '}
										<strong>kinh nghiệm</strong> và <strong> kỹ năng</strong>{' '}
										của bạn.
									</p>
									<Link
										to='/login'
										className='w-full flex rounded-lg p-2 outline-none bg-[#5932bc] text-white text-[14px] font-semibold hover:bg-[#2f0d7b] transition duration-300 cursor-pointer'
									>
										<p className='text-[14px] mx-auto font-medium'>Đăng nhập</p>
									</Link>
									<button className='mt-4 w-full flex border border-[#dfdfdf] rounded-lg p-2 outline-none cursor-pointer transition duration-300 hover:shadow-[0_0_0_3px_rgba(79,204,255,0.15)]'>
										<img src={googleIcon} className='w-6' alt='google icon' />
										<div className='flex-1'>
											<p className='text-[14px] font-medium'>
												Đăng nhập với Google
											</p>
										</div>
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default HeroSection;
