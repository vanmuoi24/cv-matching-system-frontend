
import type { Axios } from "axios"
import type { Ilogin } from "../../../type/Auth"
import instance from "../../Axios/Axios.ts"
import type { AxiosResponse } from "../../../type/ResponseAPI"


const LoginApi =(data:Ilogin) :Promise<AxiosResponse>=>{
return instance.post('/users/login',data)    
}


export  {
    LoginApi
}   