export interface IOwner {
  id: number;
  fullName: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
  createAt: string;   
  updateAt: string;   
  role: 'RECRUITER' | 'ADMIN' | 'USER' | null;
}

export interface ICompany {
  id: number;
  name: string;
  description: string;
  website: string;
  logoUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
  createAt: string;   
  role: string | null;
  owner: IOwner | null;
  job: any | null;    
}
