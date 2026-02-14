export interface AxiosResponse<T = any> {
  result: T;
  message: string;
  code: number;
}