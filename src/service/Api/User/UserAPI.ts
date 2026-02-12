import type { AxiosResponse } from "../../../types/ResponseAPI.ts"
import instance from "../../Axios/Axios.ts"



const GetListUser = (): Promise<AxiosResponse> => {
    return instance.get('/users/list')
}

const GetUserById = (id: number): Promise<AxiosResponse> => {
    return instance.get(`/users/${id}`)
}

const CreateUser = (data: any): Promise<AxiosResponse> => {
    return instance.post('/users', data)
}

const UpdateUser = (id: number, data: any): Promise<AxiosResponse> => {
    return instance.put(`/users/${id}`, data)
}

const DeleteUser = (id: number): Promise<AxiosResponse> => {
    return instance.delete(`/users/${id}`)
}

export {
    GetListUser,
    GetUserById,
    CreateUser,
    UpdateUser,
    DeleteUser
}