import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

function CandidateLayout() {
	return (
		<>
			<Header />
			<main className='min-h-[80vh] pt-[112px] md:pt-[120px]'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default CandidateLayout;
