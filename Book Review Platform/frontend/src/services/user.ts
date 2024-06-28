import ApiResponse from "../resources/enums/domain/entity/IApiResponse";
import { http } from "../util/http";

import endPoints from "../constants/endPoints";

import {
  IFacebookCredential,
  IGoogleCredential,
  ILogIn,
  ISignUp,
} from "../interfaces/commonInterfaces";


type SignUpData = ISignUp | IGoogleCredential | IFacebookCredential;
type LogInData = ILogIn | IGoogleCredential | IFacebookCredential;

export const signUp = (data: SignUpData): Promise<ApiResponse> => {
  return http.post(`${endPoints.user.SIGN_UP}`, data);
};

export const logIn = (data?: LogInData): Promise<ApiResponse> => {
  return http.post(`${endPoints.user.LOGIN}`, data);
};

export const editProfile = (id: string, data: Partial<ISignUp>): Promise<ApiResponse> => {
  return http.patch(`${endPoints.user.EDIT_PROFILE.replace(":id", id)}`, data);
};

export const deleteProfile = (id: string): Promise<ApiResponse> => {
  return http.patch(`${endPoints.user.DELETE_PROFILE.replace(":id", id)}`);
};  