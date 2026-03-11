import { Outlet } from 'react-router-dom';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';

const navItems = [
	{ to: '/re/prices', label: 'Bảng giá' },
	{ to: '/re/candidates', label: 'Tìm ứng viên' },
	{ to: '/re/help', label: 'Trợ giúp' },
];

function RecruiterLayout() {
	const user = localStorage.getItem('user');
	if (user && JSON.parse(user).role === 'USER') {
		localStorage.clear();
	}
	return (
		<>
			<Header isRecruiter={true} navItems={navItems} />
			<main className='min-h-[80vh] pt-[112px] md:pt-[120px]'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default RecruiterLayout;
