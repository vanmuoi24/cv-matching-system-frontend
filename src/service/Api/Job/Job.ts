import instance from '../../Axios/Axios.ts';
import type { AxiosResponse } from '../../../types/ResponseAPI.ts';

const JobsApi = (): Promise<AxiosResponse> => {
	return instance.get('/jobs/list');
};

const JobApiById = (id: string): Promise<AxiosResponse> => {
	return instance.get(`/jobs/${id}`);
};

export { JobsApi, JobApiById };
