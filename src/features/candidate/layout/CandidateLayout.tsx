import { Outlet } from 'react-router-dom';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';

const navItems = [
	{ to: '/ca/job', label: 'Việc Làm' },
	{ to: '/ca/tool', label: 'Công cụ' },
	// { to: '/ca/blog', label: 'Cẩm nang nghề nghiệp' },
];

function CandidateLayout() {
	const user = localStorage.getItem('user');
	if (user && JSON.parse(user).role === 'RECRUITER') {
		localStorage.clear();
	}
	return (
		<>
			<Header navItems={navItems} isRecruiter={false} />
			<main className='min-h-[80vh] pt-[112px] md:pt-[120px]'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default CandidateLayout;
