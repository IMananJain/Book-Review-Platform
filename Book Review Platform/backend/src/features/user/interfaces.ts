import Document from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
  status: string;
}

export interface IUserData {
  id: string;
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface ISignUp {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface ILogIn {
  email: string;
  password: string;
}

export interface IGoogleCredential{
  googleCredential: string;
}

export interface IFacebookCredential {
  username: string;
  email: string;
  image: string;
}