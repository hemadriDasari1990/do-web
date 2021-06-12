import {
  CLEAR_LOGIN,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESEND_ACTIVATION_LINK_FAILED,
  RESEND_ACTIVATION_LINK_REQUEST,
  RESEND_ACTIVATION_LINK_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  VALIDATE_FORGOT_PASSWORD_FAILED,
  VALIDATE_FORGOT_PASSWORD_REQUEST,
  VALIDATE_FORGOT_PASSWORD_SUCCESS,
  VERIFY_TOKEN_FAILED,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
} from "../../actions/login/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  token: null,
  loading: false,
  response: null,
  loginSuccess: false,
};

const login = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginSuccess: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
        loginSuccess: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
        loginSuccess: true,
      };

    case VERIFY_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_TOKEN_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case VALIDATE_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VALIDATE_FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case VALIDATE_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case LOGOUT_REQUEST:
      return {
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        loginSuccess: false,
      };

    case RESEND_ACTIVATION_LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESEND_ACTIVATION_LINK_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case RESEND_ACTIVATION_LINK_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default login;
