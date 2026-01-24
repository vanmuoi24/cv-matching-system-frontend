import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import AuthRoutes from './AuthRoutes';
import RecruiterRoutes from './RecruiterRoutes';
import CandidateRoutes from './CandidateRoutes';
import NotFound from '../shared/components/NotFound';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/ca' replace />} />

			<Route path='/ca/*' element={<CandidateRoutes />} />
			<Route path='/re/*' element={<RecruiterRoutes />} />
			<Route path='/auth/*' element={<AuthRoutes />} />
			<Route path='/admin/*' element={<AdminRoutes />} />

			{/* 404 global */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
