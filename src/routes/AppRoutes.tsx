import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../features/candidate/pages/NotFound/page';

import AdminSidebar from '../layouts/AdminLayout';
import Usermanager from '../features/admin/components/UserManager/Usermanager';

import JobPostingManagement from '../features/admin/components/JobPostingManagement/JobPostingManagement';
import AICVFilter from '../features/admin/components/AICVFilter/AICVFilter';
import JobCvAIFilter from '../features/admin/components/AICVFilter/JobCvAIFilter';
import Dash from '../features/admin/components/Dash/Dash';
import Company from '../features/admin/components/Company/Company';
// import Admin	Routes from '../features/admin/routes/AdminRoutes';
import AuthRoutes from '../features/auth/routes/AuthRoutes';
import RecruiterRoutes from '../features/recruiter/routes/RecruiterRoutes';
import CandidateRoutes from '../features/candidate/routes/CandidateRoutes';

const AppRoutes = () => {
	return (
		<Routes>
			<Route>
				{/* ADMIN */}
				<Route element={<AdminSidebar />}>
					<Route path='/admin' element={<Dash />}></Route>
					<Route path='/admin/users' element={<Usermanager />} />

					<Route path='/admin/jobs' element={<JobPostingManagement />} />
					<Route path='/admin/ai' element={<AICVFilter />} />
					<Route path='/admin/ai/:id' element={<JobCvAIFilter />} />
					<Route path='/admin/company' element={<Company />} />

					<Route path='/admin/statistics' element={<AdminSidebar />} />
				</Route>
			</Route>
			<Route path='/' element={<Navigate to='/ca' replace />} />

			<Route path='/ca/*' element={<CandidateRoutes />} />
			<Route path='/re/*' element={<RecruiterRoutes />} />
			<Route path='/auth/*' element={<AuthRoutes />} />
			{/* <Route path='/admin/*' element={<AdminRoutes />} /> */}

			{/* 404 global */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
