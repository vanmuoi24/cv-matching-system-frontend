import { useRef } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './FilterScrollMenu.css';

const FilterScrollMenu = ({
	data,
	css,
	activeTab,
	onChangeFilter,
}: {
	data: string[];
	css?: string;
	theme: string;
	activeTab: string;
	onChangeFilter: (value: string) => void;
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	if (!data) {
		return null;
	}

	// Hàm xử lý cuộn khi nhấn nút mũi tên
	const scroll = (direction: string) => {
		if (scrollRef.current) {
			const { current } = scrollRef;
			const scrollAmount = 200;
			if (direction === 'left') {
				current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
			} else {
				current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
			}
		}
	};

	return (
		<div className={`${css ? css : ''} w-full`}>
			<div className='flex items-center justify-end gap-2 max-w-4xl'>
				{/* Nút Previous (Antd Button) */}
				<Button
					shape='circle'
					icon={<LeftOutlined />}
					onClick={() => scroll('left')}
					className='shrink-0 border-none shadow-none bg-transparent hover:bg-gray-200 text-gray-500'
				/>

				{/* Container cuộn (Tailwind) */}
				<div
					ref={scrollRef}
					className='flex overflow-x-auto gap-3 scroll-smooth no-scrollbar py-2 px-1'
				>
					{data.map((item, index) => (
						<button
							key={`${item}-${index}`}
							onClick={() => onChangeFilter(item)}
							className={`
              whitespace-nowrap px-5 py-2 rounded-full font-medium transition-all duration-200 border cursor-pointer
              ${
								activeTab === item
									? ` bg-[#2f0d7b] text-white border-[#2f0d7b] shadow-md` // Style khi Active
									: `bg-white text-gray-700 border-[#2f0d7b] hover:bg-gray-100 shadow-sm` // Style mặc định
							}
            `}
						>
							{item}
						</button>
					))}
				</div>

				{/* Nút Next (Antd Button) */}
				<Button
					shape='circle'
					icon={<RightOutlined />}
					onClick={() => scroll('right')}
					className='shrink-0 border-purple-600 text-purple-600 hover:text-purple-700 hover:border-purple-700'
				/>
			</div>
		</div>
	);
};

export default FilterScrollMenu;
