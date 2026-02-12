
export interface Ilogin {
    email: string;
    password: string;
}

export interface IRegister {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role?: string;
}
