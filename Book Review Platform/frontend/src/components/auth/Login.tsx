import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "../../constants/routes";
import { bindActionCreators } from "redux";
import { logInAction } from "../../state_management/actions/authAction";
import {
  IFacebookCredential,
  ILogIn,
  IUserAuthData,
} from "../../interfaces/commonInterfaces";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  googleOAuthConfigWeb,
  facebookOAuthConfigWeb,
} from "../../config/oAuthConfig";
import { logIn } from "../../services/user";
import ReactFacebookLogin from "react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../utilities/commonToastMessage";
import { logInValidationSchema } from "../utilities/validationSchema";
import { setAccessToken } from "../../helper/storage";


const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILogIn>({
    resolver: yupResolver(logInValidationSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      logInAction,
    },
    dispatch
  );

  const onSubmit = async (data: ILogIn) => {
    const response = await logIn(data);
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
      toastMessageSuccess("Successfully logged in");
      navigate(routes.HOME);
    }
    if (response && response.error && !response.error.success) {
      toastMessageError(`Error ${response.error.message}`);
    }
  };

  return (
    <>
      <div>
        <h1>LogIn Page</h1>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" className="btn btn-primary">
              LogIn
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
        <div>
          <GoogleOAuthProvider clientId={googleOAuthConfigWeb.client_id}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const response = await logIn({
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
                  toastMessageSuccess("Successfully logged in");
                  navigate(routes.HOME);
                }
                if (response && response.error && !response.error.success) {
                  toastMessageError(`Error ${response.error.message}`);
                }
              }}
              onError={() => {
                toastMessageError("LogIn Failed");
              }}
            />
          </GoogleOAuthProvider>
          <ReactFacebookLogin
            appId={facebookOAuthConfigWeb.app_id}
            autoLoad={false}
            fields="name,email,picture"
            callback={async (credentialResponse) => {
              const { name, email,picture } = credentialResponse as {
                name: string;
                email: string;
                picture: any;
              };
              const response = await logIn({
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
                toastMessageSuccess("Successfully logged in");
                navigate(routes.HOME);
              }
              if (response && response.error && !response.error.success) {
                toastMessageError(`Error ${response.error.message}`);
              }
            }}
            icon={<FaFacebook />}
            textButton=" Log In"
            onFailure={() => {
              toastMessageError("LogIn Failed");
            }}
          />
        </div>
        <div>
        <h5>Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link></h5>
        </div>
      </div>
    </>
  );
};
export default Login;
