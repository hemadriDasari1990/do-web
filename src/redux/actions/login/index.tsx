import {
  FORGOT_PASSWORD_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  RESEND_TOKEN_REQUEST,
  RESET_PASSWORD_REQUEST,
  VALIDATE_FORGOT_PASSWORD_REQUEST,
  VERIFY_TOKEN_REQUEST,
} from "./types";

export const login = (payload: { [Key: string]: any }) => {
  return {
    type: LOGIN_REQUEST,
    url: `/organization`,
    payload: payload,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const verifyToken = (payload: { [Key: string]: any }) => {
  return {
    type: VERIFY_TOKEN_REQUEST,
    payload: payload,
  };
};

export const resendToken = (payload: { [Key: string]: any }) => {
  return {
    type: RESEND_TOKEN_REQUEST,
    payload: payload,
  };
};

export const forgotPassword = (payload: { [Key: string]: any }) => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: payload,
  };
};

export const validateForgotPassword = (payload: { [Key: string]: any }) => {
  return {
    type: VALIDATE_FORGOT_PASSWORD_REQUEST,
    payload: payload,
  };
};

export const resetPassword = (payload: { [Key: string]: any }) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: payload,
  };
};
