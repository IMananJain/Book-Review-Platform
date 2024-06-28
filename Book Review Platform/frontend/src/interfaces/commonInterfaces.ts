export interface ISignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: FileList;
};

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

export interface IFacebookCredential{
  username: string;
  email: string;
  image: string;
}

export interface IGoogleCredential{
  googleCredential: string | undefined;
}

export interface ProfileData {
  id?: string; 
  username: string;
  image: string;
}

export interface IEditProfileFormValues {
  username: string;
  image: FileList;
};

export interface IBookFormValues {
  title: string;
  image: FileList;
  author: string;
  description: string;
  genre: string;
}

export interface IBook{
  _id?: string;
  title: string;
  image: string;
  author: string;
  description: string;
  genre: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IReview {
  _id?: string;
  rating: number;
  comment: string;
  userId?: string;
  bookId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserAuthData {
  _id: string;
  username: string;
  email: string;
  image: string;
  jwtToken: string;
}