import { AxiosResponse } from "axios";

export interface StringKeyObject {
  [key: string]: string;
}

export type TApiState = Record<string, any> | null;

export default interface ApiResponse<T = any>
  extends Partial<AxiosResponse<T | TApiState>> {
  data: TApiState;
  error: TApiState;
}
