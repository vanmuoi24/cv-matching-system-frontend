import { Routes, Route } from 'react-router-dom';


import AdminLayout from '../../../layouts/AdminLayout';
import Dashboard from '../components/Dash/Dash';
import CVDetail from '../components/CVDetail/CVDetail';

const AdminRoutes = () => {
	return (
		<Routes>
			{/* ADMIN */}
			<Route element={<AdminLayout />}>
				
				<Route index element={<Dashboard />} />
				<Route path="cv/:id" element={<CVDetail />} />
			</Route>
		</Routes>
	);
};

export default AdminRoutes;
