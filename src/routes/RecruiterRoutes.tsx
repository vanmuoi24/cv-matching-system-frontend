import { Route, Routes } from 'react-router-dom';

import RecruiterLayout from '../layouts/RecruiterLayout';
import Home from '../features/recruiter/pages/Home/page';
import Candidates from '../features/recruiter/pages/Candidates/page';
import Price from '../features/recruiter/pages/Price/page';
import Help from '../features/recruiter/pages/Help/page';
const RecruiterRoutes = () => {
	return (
		<Routes>
			<Route element={<RecruiterLayout />}>
				<Route index element={<Home />} />
				<Route path='candidates' element={<Candidates />} />
				<Route path='prices' element={<Price />} />
				<Route path='help' element={<Help />} />
			</Route>
		</Routes>
	);
};

export default RecruiterRoutes;
