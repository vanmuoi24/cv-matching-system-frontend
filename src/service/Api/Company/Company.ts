import type { AxiosResponse } from "../../../types/ResponseAPI.ts"
import instance from "../../Axios/Axios.ts"


const GetListCompany =():Promise<AxiosResponse> =>{
    return instance.get('/companies')
}

const GetListJob =():Promise<AxiosResponse> =>{
    return instance.get('/jobs/list');
}
export {
    GetListCompany,
    GetListJob
}