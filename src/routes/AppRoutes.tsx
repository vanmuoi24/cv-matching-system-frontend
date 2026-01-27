import { Routes, Route } from 'react-router-dom';
import NotFound from '../features/candidate/pages/NotFound/page';

import AuthLayout from '../layouts/AuthLayout';
import Login from '../features/auth/Login/page';
import Register from '../features/auth/Register/page';
import CandidateLayout from '../layouts/CandidateLayout';
import Job from '../features/candidate/pages/Job/page';
import RecruiterLayout from '../layouts/RecruiterLayout';
import Home from '../features/candidate/pages/Home/pages';
import AdminSidebar from '../layouts/AdminLayout';
import Usermanager from '../features/admin/components/UserManager/Usermanager';

import JobPostingManagement from '../features/admin/components/JobPostingManagement/JobPostingManagement';
import AICVFilter from '../features/admin/components/AICVFilter/AICVFilter';
import JobCvAIFilter from '../features/admin/components/AICVFilter/JobCvAIFilter';
import Dash from '../features/admin/components/Dash/Dash';
import Company from '../features/admin/components/Company/Company';

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

			<Route>
				{/* AUTH */}
				<Route element={<AuthLayout />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Route>
			</Route>

			<Route>
				{/* USER */}
				<Route element={<CandidateLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/jobs' element={<Job />} />
				</Route>
			</Route>

			<Route>
				{/* RECRUITER */}
				<Route element={<RecruiterLayout />}>
					<Route path='/recruiter' element={<Home />} />
				</Route>
			</Route>

			{/* 404 global */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
