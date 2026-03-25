import type { IApplication } from '../../../types/TypeApplication';
import instance from '../../Axios/Axios.ts';
import type { AxiosResponse } from '../../../types/ResponseAPI.ts';

const CreateApplication = (data: IApplication): Promise<AxiosResponse> => {
	return instance.post('/applications', data);
};

const UpdateApplication = (
	applicationId: number,
	data: Partial<IApplication>,
): Promise<AxiosResponse> => {
	return instance.post(`/applications/update/${applicationId}`, data);
};

const GetApplicationsByCandidateId = async (
	candidateId: number,
): Promise<AxiosResponse> => {
	return instance.get(`/applications/candidate/${candidateId}`);
};
export { CreateApplication, UpdateApplication, GetApplicationsByCandidateId };
