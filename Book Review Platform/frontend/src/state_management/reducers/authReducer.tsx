import { IUserAuthData } from "../../interfaces/commonInterfaces";
import ActionType from "../../resources/enums";

export interface IRootState {
  isLoggedIn: boolean;
  authData?: IUserAuthData;
}

const initialState: IRootState = {
  isLoggedIn: false,
  authData: {} as IUserAuthData,
};

interface LoginAction {
  type: ActionType.LOGIN;
  payload: IUserAuthData;
}

interface UpdateAuthAction {
  type: ActionType.UPDATE_AUTH;
  payload: IUserAuthData;
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}
interface DeleteAuthAction {
  type: ActionType.DELETE_AUTH;
}

type Action = LoginAction | UpdateAuthAction | DeleteAuthAction | LogoutAction;

const AuthReducer = ( state: IRootState = initialState,action: Action): IRootState => {
  switch (action.type) {
    case ActionType.LOGOUT:
      return {
        isLoggedIn: false,
        authData: {} as IUserAuthData,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        authData: { ...state.authData, ...action?.payload },
      };
    case ActionType.UPDATE_AUTH:
      return {
        ...state,
        isLoggedIn: true,
        authData: { ...state.authData, ...action?.payload },
      };
    case ActionType.DELETE_AUTH:
      return {
        isLoggedIn: false,
        authData: {} as IUserAuthData,
      };
    default:
      return state;
  }
};

export default AuthReducer;
