import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../features/admin/pages/Dashboard/page';

const AdminRoutes = () => {
	return (
		<Routes>
			{/* ADMIN */}
			<Route element={<AdminLayout />}>
				<Route index element={<Dashboard />} />
			</Route>
		</Routes>
	);
};

export default AdminRoutes;
