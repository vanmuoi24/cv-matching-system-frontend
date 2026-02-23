
import type { AxiosResponse } from "../../../types/ResponseAPI.ts";
import type { IJob } from "../../../types/TypeJob.ts";
import instance from '../../Axios/Axios.ts';
const GetListJob = (): Promise<AxiosResponse> => {
  return instance.get("/jobs/list");
};

const UpdateJob = (
  id: number | undefined,
  data: Partial<IJob>,
): Promise<AxiosResponse> => {
  return instance.put(`/jobs/${id}`, data);
};

const AddJob = (data: Partial<IJob>): Promise<AxiosResponse> => {
  return instance.post("/jobs", data);
};

const DeleteJob = (id: number | undefined): Promise<AxiosResponse> => {
  return instance.delete(`/jobs/${id}`);
};


const JobsApi = (): Promise<AxiosResponse> => {
	return instance.get('/jobs/list');
};

const JobApiById = (id: string): Promise<AxiosResponse> => {
	return instance.get(`/jobs/${id}`);
};

export { JobsApi, JobApiById };

export { GetListJob, UpdateJob, AddJob, DeleteJob };
