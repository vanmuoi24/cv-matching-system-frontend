import type { AxiosResponse } from "../../../types/ResponseAPI.ts"
import instance from "../../Axios/Axios.ts"


const GetListCompany = (): Promise<AxiosResponse> => {
    return instance.get('/companies')
}

const GetCompanyById = (id: number): Promise<AxiosResponse> => {
    return instance.get(`/companies/${id}`)
}

const CreateCompany = (data: FormData): Promise<AxiosResponse> => {
    return instance.post('/companies', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const UpdateCompany = (id: number, data: FormData): Promise<AxiosResponse> => {
    return instance.put(`/companies/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const DeleteCompany = (id: number): Promise<AxiosResponse> => {
    return instance.delete(`/companies/${id}`)
}

export {
    GetListCompany,
    GetCompanyById,
    CreateCompany,
    UpdateCompany,
    DeleteCompany
}