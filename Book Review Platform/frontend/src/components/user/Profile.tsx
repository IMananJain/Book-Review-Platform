import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state_management/reducers";
import { Link, useNavigate } from "react-router-dom";

import routes from "../../constants/routes";

import storage from "../../util/storage";
import { bindActionCreators } from "redux";
import { deleteAuthAction } from "../../state_management/actions/authAction";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../utilities/commonToastMessage";
import { deleteProfile } from "../../services/user";

import "./Profile.css"; 

const Profile: React.FC = () => {
  const { authData } = useSelector((state: RootState) => state.AuthReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      deleteAuthAction,
    },
    dispatch
  );

  const handleDelete = async () => {
    const response = await deleteProfile(authData?._id as string);

    if (response && response.data && response.data.success) {
      actions.deleteAuthAction();
      storage.clear();
      toastMessageSuccess("Successfully deleted profile");
      navigate(routes.PROFILE);
    }
    if (response && response.error && !response.error.success) {
      toastMessageError(`Error ${response.error.message}`);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile Page</h1>

      {authData && authData._id ? (
        <div className="profile-section">
          <div className="profile-section-item">
          <div>
            <img src={authData.image} alt="Profile Image" className="profile-image" />
          </div>
            <p className="profile-section-label">User Name: {authData.username}</p>
            <p className="profile-section-label">Email: {authData.email}</p>
          </div>
        </div>
      ) : (
        <span>Cannot Edit profile</span>
      )}

      {authData && authData._id && (
        <>
          <Link to={routes.EDIT_PROFILE.replace(":id", authData._id)} className="profile-link">
            Edit Profile
          </Link>
          <button onClick={handleDelete} className="profile-button">
            Delete Profile
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
