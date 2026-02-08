import type { AxiosResponse } from "../../../types/ResponseAPI.ts"
import instance from "../../Axios/Axios.ts"



const GetListUser =():Promise<AxiosResponse> =>{
    return instance.get('/users/list')
}
export {
    GetListUser
}