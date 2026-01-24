import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

const navItems = [
	{ to: '/ca/job', label: 'Việc Làm' },
	{ to: '/ca/tool', label: 'Công cụ' },
	{ to: '/ca/blog', label: 'Cẩm nang nghề nghiệp' },
];

function CandidateLayout() {
	return (
		<>
			<Header navItems={navItems} isRecruiter={false} />
			<main className='min-h-[80vh]'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default CandidateLayout;
