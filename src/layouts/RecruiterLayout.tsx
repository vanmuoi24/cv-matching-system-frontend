import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

function RecruiterLayout() {
	return (
		<>
			<Header />
			<main className='min-h-[80vh]'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default RecruiterLayout;
