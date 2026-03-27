import type { Ilogin, IRegister } from '../../../types/Auth.ts';
import instance from '../../Axios/Axios.ts';
import type { AxiosResponse } from '../../../types/ResponseAPI.ts';
import type { IChangePasswordRequest } from '../../../types/ChangePassword';

const LoginApi = (data: Ilogin): Promise<AxiosResponse> => {
	return instance.post('/users/login', data);
};

const RegisterApi = (data: IRegister): Promise<AxiosResponse> => {
	return instance.post('/users/register', data);
};

const ChangePasswordApi = (
	data: IChangePasswordRequest,
): Promise<AxiosResponse> => {
	return instance.post('/users/Change-password', data);
};

const LogoutApi = (): void => {
	const user = localStorage.getItem('user');
	if (user) {
		const role = JSON.parse(user).role;
		if (role === 'USER') {
			localStorage.clear();
			window.location.href = '/auth/ca/login';
		} else {
			localStorage.clear();
			window.location.href = '/auth/re/login';
		}
	}
};

export { LoginApi, RegisterApi, LogoutApi, ChangePasswordApi };
