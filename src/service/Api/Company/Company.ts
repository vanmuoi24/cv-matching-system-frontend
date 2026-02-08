import type { AxiosResponse } from "../../../types/ResponseAPI.ts"
import instance from "../../Axios/Axios.ts"


const GetListCompany =():Promise<AxiosResponse> =>{
    return instance.get('/companies')
}
export {
    GetListCompany
}