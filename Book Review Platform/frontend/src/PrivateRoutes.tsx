import React, { useCallback, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { isExpired } from "react-jwt";


import routes, { beforeLoginRoutes } from "./constants/routes";

import storage from "./util/storage";
import { getAccessToken } from "./helper/storage";

import { toastMessageError } from "./components/utilities/commonToastMessage";
import { logOutAction } from "./state_management/actions/authAction";


interface Props {
  component: React.ComponentType;
  route: string;
}

const PrivateRoutes: React.FC<Props> = ({
  component: RouteComponent,
  route,
}) => {
  let returnData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const actions = bindActionCreators(
    {
      logOutAction,
    },
    dispatch
  );

  const authToken = getAccessToken();

  const sessionExpire = useCallback(() => {
    if (authToken) {
      const isMyTokenExpired = isExpired(authToken);
      if (isMyTokenExpired) {
        storage.clear();
        actions.logOutAction();
        toastMessageError("Token expired");
        navigate(routes.LOGIN);
      }
    }
  }, [authToken, actions, navigate]);

  useEffect(() => {
    sessionExpire();
  }, [sessionExpire]);

  if (authToken) {
     returnData = <RouteComponent />;
  } else {
    if (beforeLoginRoutes.includes(route)) returnData = <RouteComponent />;
    else returnData = <Navigate to={routes.LOGIN} />;
  }

  return returnData;
};

export default PrivateRoutes;
