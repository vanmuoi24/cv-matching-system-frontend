import { useState } from 'react';
import {
	Button,
	Input,
	Select,
	TreeSelect,
	type SelectProps,
	type TreeSelectProps,
} from 'antd';

import searchIcon from '../../../../../assets/icons/searchIcon.png';
import fileRemoveIcon from '../../../../../assets/icons/fileRemoveIcon.png';
import thunderIcon from '../../../../../assets/icons/thunderIcon.png';
import googleIcon from '../../../../../assets/icons/googleIcon.png';
import { Link } from 'react-router-dom';
import Container from '../../../../../shared/components/Container';

const { SHOW_PARENT } = TreeSelect;

const professionData = [
	{
		title: 'IT - Phần mềm',
		value: '0',
		key: '0',
	},
	{
		title: 'IT - Phần cứng',
		value: '1',
		key: '1',
	},
	{
		title: 'Khách sạn - Nhà hàng - Du lịch',
		value: '2',
		key: '2',
	},
];
const placeData = [
	{
		label: 'Hà Nội',
		value: 'Hà Nội',
	},
	{
		label: 'Hồ Chí Minh',
		value: 'Hồ Chí Minh',
	},
	{
		label: 'Đà Nẵng',
		value: 'Đà Nẵng',
	},
];

const HeroSection = () => {
	const [professions, setProfessions] = useState<string[]>([]);
	const [place, setPlace] = useState<string>('');
	console.log(place);
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
		treeData: professionData,
		value: professions,
		onChange: onChangeProfessions,
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: 'Chọn ngành nghề',
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
		options: placeData,
		style: {
			width: '100%',
		},
	};

	return (
		<div className='bg-[#ede7ff] py-10'>
			<Container>
				<div className='flex gap-10'>
					<div className='flex-7'>
						<div>
							<p className='block text-2xl font-bold'>
								670.000+ người đã ứng tuyển thành công!
							</p>
							<p className='block text-[16px] font-semibold'>
								Nhanh hơn. Dễ dàng hơn.
							</p>
						</div>
						<span className='block w-full h-px bg-gray-300 my-3'></span>
						<div className=' flex items-center shadow-lg p-2 py-3 rounded-[48px] bg-white border border-gray-200'>
							<div className='flex-2 '>
								<Input
									className='text-[14px]! font-medium border-none!'
									placeholder='Nhập vị trí bạn muốn ứng tuyển'
									prefix={<img className='w-4 mr-2' src={searchIcon} alt='' />}
									bordered={false}
								/>
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
							<div className='flex-1'>
								<Button
									type='primary'
									className='rounded-3xl! text-[14px]! font-semibold! bg-[#451fa3]! w-full!'
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
