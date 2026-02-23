<<<<<<< HEAD
// import { Routes, Route } from 'react-router-dom';
// import AdminLayout from '../layout/AdminLayout';
// import Dashboard from '../pages/Dashboard/page';

// const AdminRoutes = () => {
// 	return (
// 		<Routes>
// 			{/* ADMIN */}
// 			<Route element={<AdminLayout />}>
// 				<Route index element={<Dashboard />} />
// 			</Route>
// 		</Routes>
// 	);
// };
=======
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
>>>>>>> 216b62bae4551113a0ccb8ae24505107087c9c41

// export default AdminRoutes;
