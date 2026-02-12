import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import RegisterRE from '../pages/RegisterRE/page';
import RegisterCA from '../pages/RegisterCA/page';
import LoginCA from '../pages/LoginCA/page';
import LoginRE from '../pages/LoginRE/page';

const AuthRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path='re/login' element={<LoginRE />} />
				<Route path='re/register' element={<RegisterRE />} />
				<Route path='ca/login' element={<LoginCA />} />
				<Route path='ca/register' element={<RegisterCA />} />
			</Route>
		</Routes>
	);
};

export default AuthRoutes;
