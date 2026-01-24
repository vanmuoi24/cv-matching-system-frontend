import { Route, Routes } from 'react-router-dom';
import CandidateLayout from '../layouts/CandidateLayout';
import Job from '../features/candidate/pages/Job/page';
import Home from '../features/candidate/pages/Home/pages';
import Blog from '../features/candidate/pages/Blog/page';
import Tool from '../features/candidate/pages/Tools/page';
const CandidateRoutes = () => {
	return (
		<Routes>
			<Route element={<CandidateLayout />}>
				<Route index element={<Home />} />
				<Route path='/job' element={<Job />} />
				<Route path='/tool' element={<Tool />} />
				<Route path='/blog' element={<Blog />} />
			</Route>
		</Routes>
	);
};

export default CandidateRoutes;
