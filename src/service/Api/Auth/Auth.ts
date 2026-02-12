import type { Ilogin, IRegister } from "../../../types/Auth.ts"
import instance from "../../Axios/Axios.ts"
import type { AxiosResponse } from "../../../types/ResponseAPI.ts"


const LoginApi = (data: Ilogin): Promise<AxiosResponse> => {
    return instance.post('/users/login', data)
}

const RegisterApi = (data: IRegister): Promise<AxiosResponse> => {
    return instance.post('/users/register', data)
}


export {
    LoginApi,
    RegisterApi
}