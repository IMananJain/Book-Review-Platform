import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state_management/reducers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import { IEditProfileFormValues } from "../../interfaces/commonInterfaces";
import { bindActionCreators } from "redux";
import { updateAuthAction } from "../../state_management/actions/authAction";
import { editProfileValidationSchema } from "../utilities/validationSchema";
import { fileToBase64 } from "../auth/SignUp";
import { editProfile } from "../../services/user";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonToastMessage";

import "./EditProfile.css"; 

const EditProfile: React.FC = () => {
  const { authData } = useSelector((state: RootState) => state.AuthReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProfileFormValues>({
    resolver: yupResolver(editProfileValidationSchema)
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      updateAuthAction,
    },
    dispatch
  );

  const onSubmit = async (data: IEditProfileFormValues) => {
    const base64StringImage = await fileToBase64(data.image[0]);

    const editProfileFormData = { username : data.username, image: base64StringImage };
    const response = await editProfile(authData?._id as string,editProfileFormData);

    if (response && response.data && response.data.success) {
      const userDetails = response?.data?.data?.userDetails;
      
      actions.updateAuthAction({ ...authData, ...userDetails });
      toastMessageSuccess("Successfully updated profile");
      navigate(routes.PROFILE);
    }
    if (response && response.error && !response.error.success) {
        toastMessageError(`Error ${response.error.message}`);
    }
  };

  return (
    <>
      <div>
        <h1>Edit Profile Page</h1>
      </div>
      <div className="editProfile-container">
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
