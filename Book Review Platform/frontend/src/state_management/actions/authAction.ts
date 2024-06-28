import { Action, Dispatch } from "redux";
import { IUserAuthData } from "../../interfaces/commonInterfaces";
import ActionType from "../../resources/enums";

export const logInAction =
  (data: IUserAuthData) => (dispatch: Dispatch<Action>) => {
    return dispatch({
      type: ActionType.LOGIN,
      payload: data,
    });
  };
export const updateAuthAction =
  (data: IUserAuthData) => (dispatch: Dispatch<Action>) => {
    return dispatch({
      type: ActionType.UPDATE_AUTH,
      payload: data,
    });
  };
export const deleteAuthAction = () => (dispatch: Dispatch<Action>) => {
  return dispatch({
    type: ActionType.DELETE_AUTH,
  });
};

export const logOutAction = () => (dispatch: Dispatch<Action>) => {
  return dispatch({
    type: ActionType.LOGOUT,
  });
};
