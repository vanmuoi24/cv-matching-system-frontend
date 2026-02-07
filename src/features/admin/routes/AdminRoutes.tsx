import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';


const AdminRoutes = () => {
	return (
		<Routes>
			{/* ADMIN */}
			<Route element={<AdminLayout />}>
				
			</Route>
		</Routes>
	);
};

export default AdminRoutes;
