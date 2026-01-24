import { Routes, Route } from 'react-router-dom';
import NotFound from '../features/candidate/pages/NotFound/page';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../features/admin/pages/Dashboard/page';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../features/auth/Login/page';
import Register from '../features/auth/Register/page';
import CandidateLayout from '../layouts/CandidateLayout';
import Job from '../features/candidate/pages/Job/page';
import RecruiterLayout from '../layouts/RecruiterLayout';
import Home from '../features/candidate/pages/Home/pages';
const AppRoutes = () => {
	return (
		<Routes>
			<Route>
				{/* ADMIN */}
				<Route element={<AdminLayout />}>
					<Route path='/admin' element={<Dashboard />} />
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
