import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  googleOAuthConfigWeb,
  facebookOAuthConfigWeb,
} from "../../config/oAuthConfig";
import { signUp} from "../../services/user";
import { FaFacebook } from "react-icons/fa";
import {
  IFacebookCredential,
  ISignUpFormValues,
  IUserAuthData,
} from "../../interfaces/commonInterfaces";
import { signUpValidationSchema } from "../utilities/validationSchema";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonToastMessage";
import { setAccessToken } from "../../helper/storage";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { logInAction } from "../../state_management/actions/authAction";

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignUpFormValues>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      logInAction,
    },
    dispatch
  );

  const onSubmit = async (data: ISignUpFormValues) => {
    const base64StringImage = await fileToBase64(data.image[0]);

    const signupFormData = { username : data.username, email: data.email, password: data.password, image: base64StringImage };
    const response = await signUp(signupFormData);

    if (response && response.data && response.data.success) {
      toastMessageSuccess("Successfully signed up");
      navigate(routes.LOGIN);
    }
    if (response && response.error && !response.error.success) {
        toastMessageError(`Error ${response.error.message}`);
    }
  };

  return (
    <>
      <div>
        <h1>SignUp Page</h1>
      </div>
      <div className="signup-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className={`form-control ${
                errors.image ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.image?.message}</div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="social-login">
          <GoogleOAuthProvider clientId={googleOAuthConfigWeb.client_id}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const response = await signUp({
                  googleCredential: credentialResponse.credential,
                });

                if (response && response.data && response.data.success) {
                  const userDetails = response?.data?.data?.userDetails;
                  const token = response?.data?.data?.token;
                  const authData: IUserAuthData = {
                    _id: userDetails._id,
                    username: userDetails.username,
                    email: userDetails.email,
                    image: userDetails.image,
                    jwtToken: token,
                  };
                  actions.logInAction(authData);
                  setAccessToken(token);
                  toastMessageSuccess("Successfully signed up");
                  navigate(routes.HOME);
                }
                if (response && response.error && !response.error.success) {
                  toastMessageError(`Error ${response.error.message}`);
                }
              }}
              onError={() => {
                toastMessageError("SignUp Failed");
              }}
            />
          </GoogleOAuthProvider>
       
          <FacebookLogin
            appId={facebookOAuthConfigWeb.app_id}
            autoLoad={false}
            fields="name,email,picture"
            callback={async (credentialResponse) => {
              const { name, email,picture } = credentialResponse as {
                name: string;
                email: string;
                picture: any;
              };
              const response = await signUp({
                username: name,
                email: email,
                image: picture.data.url
              } as IFacebookCredential);

              if (response && response.data && response.data.success) {
                const userDetails = response?.data?.data?.userDetails;
                const token = response?.data?.data?.token;
                const authData: IUserAuthData = {
                  _id: userDetails._id,
                  username: userDetails.username,
                  email: userDetails.email,
                  image: userDetails.image,
                  jwtToken: token,
                };
                actions.logInAction(authData);
                setAccessToken(token);
                toastMessageSuccess("Successfully signed up");
                navigate(routes.HOME);
              }
              if (response && response.error && !response.error.success) {
                toastMessageError(`Error ${response.error.message}`);
              }
            }}
            icon={<FaFacebook />}
            textButton=" Sign Up"
            onFailure={() => {
              toastMessageError("SignUp Failed");
            }}
          />
        </div>
        <div>
        <h5>Have an account? <Link to={routes.LOGIN}>Log In</Link></h5>
        </div>
      </div>
    </>
  );
};

export default SignUp;
