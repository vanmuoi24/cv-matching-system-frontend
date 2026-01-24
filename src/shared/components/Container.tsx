import { type ReactNode } from 'react';
type ContainerProps = {
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
};

const sizeMap = {
	sm: 'max-w-5xl',
	md: 'max-w-6xl',
	lg: 'max-w-7xl',
	xl: 'max-w-[1280px]',
};

const Container = ({
	children,
	size = 'xl',
	className = '',
}: ContainerProps) => {
	return (
		<div className={`mx-auto w-full px-4 ${sizeMap[size]} ${className}`}>
			{children}
		</div>
	);
};

export default Container;
