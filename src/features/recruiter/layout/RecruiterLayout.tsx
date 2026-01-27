import { Outlet } from 'react-router-dom';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';

const navItems = [
	{ to: '/re/prices', label: 'Bảng giá' },
	{ to: '/re/candidates', label: 'Tìm ứng viên' },
	{ to: '/re/help', label: 'Trợ giúp' },
];

function RecruiterLayout() {
	return (
		<>
			<Header isRecruiter={true} navItems={navItems} />
			<main className='min-h-[80vh]'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default RecruiterLayout;
