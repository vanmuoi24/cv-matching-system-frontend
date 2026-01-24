import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Register from '../features/auth/Register/page';
import Login from '../features/auth/Login/page.ca';
import LoginRe from '../features/auth/Login/page.re';

const AuthRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path='re/login' element={<LoginRe />} />
				<Route path='re/register' element={<Register />} />
				<Route path='ca/login' element={<Login />} />
				<Route path='ca/register' element={<Register />} />
			</Route>
		</Routes>
	);
};

export default AuthRoutes;
