import type { AxiosResponse } from "../../../types/ResponseAPI.ts"
import instance from "../../Axios/Axios.ts"

const GetCandidateProfileById = (id: number): Promise<AxiosResponse> => {
    return instance.get(`/candidate-profiles/${id}`)
}

const CreateCandidateProfile = (data: FormData): Promise<AxiosResponse> => {
    return instance.post('/candidate-profiles', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const UpdateCandidateProfile = (id: number, data: Record<string, unknown>): Promise<AxiosResponse> => {
    return instance.post(`/candidate-profiles/update/${id}`, data)
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
