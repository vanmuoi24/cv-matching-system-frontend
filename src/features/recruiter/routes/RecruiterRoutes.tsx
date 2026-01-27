import { Route, Routes } from 'react-router-dom';

import RecruiterLayout from '../layout/RecruiterLayout';
import Home from '../pages/Home/page';
import Candidates from '../pages/Candidates/page';
import Price from '../pages/Price/page';
import Help from '../pages/Help/page';
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
