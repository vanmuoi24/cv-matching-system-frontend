import type { ICompany } from '../../../../../types/TypeCompany';

export interface ICompanyFormData extends Partial<ICompany> {
  name: string;
  description: string;
  website: string;
  status?: 'ACTIVE' | 'INACTIVE';
  logo?: File;
}

export interface IAddNewCompanyProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ICompany>) => Promise<void>;
  initialData?: Partial<ICompany>;
  isEdit?: boolean;
}
