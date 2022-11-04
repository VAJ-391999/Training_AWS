import { Reducer } from 'redux';
import { UserTokenPayload } from '../types/auth';

export interface IAuthState {
  isAuthenticated: boolean;
  user: UserTokenPayload | null;
  errorMessage: string;
}

export enum AuthActionType {
  LOGIN_SUCCESS = 'Login Success',
  LOGIN_FAIL = 'Login Fail',
  LOGOUT = 'Logout',
}

export interface AuthAction {
  type: string;
  payload: IAuthState;
}

export const AUTH_INIT_STATE: IAuthState = {
  user: null,
  isAuthenticated: false,
  errorMessage: '',
};

export const authReducer: Reducer<IAuthState, any> = (
  state: IAuthState | any,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        isAuthenticated: true,
        errorMessage: '',
      };
    case AuthActionType.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        errorMessage: action.payload.errorMessage,
      };
    case AuthActionType.LOGOUT:
      return { ...state, user: null, isAuthenticated: false, errorMessage: '' };
    default:
      return { ...state };
  }
};
