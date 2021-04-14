import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  RESEND_TOKEN_FAILED,
  RESEND_TOKEN_REQUEST,
  RESEND_TOKEN_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  VALIDATE_FORGOT_PASSWORD_FAILED,
  VALIDATE_FORGOT_PASSWORD_REQUEST,
  VALIDATE_FORGOT_PASSWORD_SUCCESS,
  VERIFY_TOKEN_FAILED,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
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
};

const login = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case RESEND_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESEND_TOKEN_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case RESEND_TOKEN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
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
    default:
      return state;
  }
};

export default login;
