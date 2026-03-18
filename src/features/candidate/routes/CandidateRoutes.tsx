import { Route, Routes } from 'react-router-dom';
import CandidateLayout from '../layout/CandidateLayout';
import Home from '../pages/Home/pages';
import Blog from '../pages/Blog/page';
import Tool from '../pages/Tool/page';
import JobList from '../pages/Job/JobList/page';
import JobDetail from '../pages/Job/JobDetail/page';
import ProfilePage from '../pages/Profile/ProfilePage';

import ProfileLayout from '../pages/Profile/layout';
import Account from '../pages/Profile/Account/page';
import Info from '../pages/Profile/Info/page';
const CandidateRoutes = () => {
	return (
		<Routes>
			<Route element={<CandidateLayout />}>
				<Route index element={<Home />} />
				<Route path='/job'>
					<Route index element={<JobList />} />
					<Route path=':jobId' element={<JobDetail />} />
				</Route>
				<Route path='/tool' element={<Tool />} />
				<Route path='/blog' element={<Blog />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/profile' element={<ProfileLayout />}>
					<Route index path='info' element={<Info />} />
					<Route path='account' element={<Account />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default CandidateRoutes;
