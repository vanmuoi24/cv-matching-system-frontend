export interface IChangePasswordRequest {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	token?: string;
}
