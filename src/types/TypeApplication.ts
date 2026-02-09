import type { IJob } from "./TypeJob";
import type { IUser } from "./TypeUser";

export interface IApplication {
  id: number;
  similarityScore?: number | null;
  status: string;        
  appliedAt: string;    
  candidate?: IUser;  
  job?: IJob;          
}
