import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  RESEND_TOKEN_FAILED,
  RESEND_TOKEN_REQUEST,
  RESEND_TOKEN_SUCCESS,
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

    case LOGOUT_REQUEST:
      return initialState;
    default:
      return state;
  }
};

export default login;
