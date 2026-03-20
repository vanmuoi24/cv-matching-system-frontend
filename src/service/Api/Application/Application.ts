import Axios from '../../Axios/Axios';

export interface ApplicationCreateRequest {
	candidateId: number;
	jobId: number;
	similarityScore?: number;
	status: string;
	appliedAt: string;
}

export const CreateApplication = async (
	data: ApplicationCreateRequest,
): Promise<any> => {
	return Axios.post('/applications', data);
};

export const GetApplicationsByCandidateId = async (
	candidateId: number,
): Promise<any> => {
	return Axios.get(`/applications/candidate/${candidateId}`);
};
