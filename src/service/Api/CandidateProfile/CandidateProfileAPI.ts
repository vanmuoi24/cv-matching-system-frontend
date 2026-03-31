import type { AxiosResponse } from "../../../types/ResponseAPI.ts"
import instance from "../../Axios/Axios.ts"

import type { AxiosRequestConfig } from "axios"

const GetCandidateProfileById = (id: number): Promise<AxiosResponse> => {
    return instance.get(`/candidate-profiles/${id}`)
}

const CreateCandidateProfile = (data: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance.post('/candidate-profiles', data, config)
}

const UpdateCandidateProfile = (id: number, data: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance.post(`/candidate-profiles/update/${id}`, data, config)
}

const DeleteCandidateProfile = (id: number): Promise<AxiosResponse> => {
    return instance.delete(`/candidate-profiles/${id}`)
}

export {
    GetCandidateProfileById,
    CreateCandidateProfile,
    UpdateCandidateProfile,
    DeleteCandidateProfile
}
