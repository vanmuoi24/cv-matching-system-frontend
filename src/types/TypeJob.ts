import type { IApplication } from "./TypeApplication";
import type { ICompany } from "./TypeCompany";
import type { IUser } from "./TypeUser";

export interface IJob {
  id: number;
  title: string;
  description?: string;
  requirement: string;
  skills: string;
  location?: string;
  jobType: string;      // FULL_TIME, PART_TIME, INTERN...
  category: string;     // IT, Marketing...
  minSalary: number;
  maxSalary: number;
  status?: string;
  createAt: string;
  expiredAt?: string;

  createdBy?: IUser;    // recruiter
  company?: ICompany;
  applicationList?: IApplication[];
}
