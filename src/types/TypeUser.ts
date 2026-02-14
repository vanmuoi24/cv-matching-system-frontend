import type { IApplication } from "./TypeApplication";
import type { ICandidateProfile } from "./TypeCandidateProfile";
import type { ICompany } from "./TypeCompany";
import type { IJob } from "./TypeJob";

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  status: string;        // ví dụ: 'ACTIVE'
  createAt: string;     // ISO string
  updateAt: string;     // ISO string
  role: 'ADMIN' | 'RECRUITER' | 'CANDIDATE' | string;

  companies?: ICompany[];          // optional vì thường API không trả full
  profile?: ICandidateProfile | null;
  jobList?: IJob[];
  applicationList?: IApplication[]; // nếu có entity Application
}
