import type { IUser } from "./TypeUser";

export interface ICandidateProfile {
  userId: number;
  user?: IUser;        
  summary?: string;
  skills: string;
  experienceYear?: string;
  cvText?: string;
  cvFileUrl?: string;
  updateAt?: string;
}
