import {
  FORGOT_PASSWORD,
  LOGIN,
  LOGOUT,
  RESEND_ACTIVATION,
  RESET_PASSWORD,
  VALIDATE_FORGOT_PASSWORD,
  VERIFY_TOKEN,
} from "../../../network/endpoints";

import API from "../../../network";

export const login = (payload: { [Key: string]: any }) => {
  return API(LOGIN, { method: "POST", data: payload });
};

export const logout = () => {
  return API(LOGOUT, { method: "POST", data: {} });
};

export const verifyToken = (payload: { [Key: string]: any }) => {
  return API(VERIFY_TOKEN, { method: "POST", data: payload });
};

export const forgotPassword = (payload: { [Key: string]: any }) => {
  return API(FORGOT_PASSWORD, { method: "POST", data: payload });
};

export const validateForgotPassword = (payload: { [Key: string]: any }) => {
  return API(VALIDATE_FORGOT_PASSWORD, { method: "POST", data: payload });
};

export const resetPassword = (payload: { [Key: string]: any }) => {
  return API(RESET_PASSWORD, { method: "POST", data: payload });
};

export const resendActivationLink = (payload: { [Key: string]: any }) => {
  return API(RESEND_ACTIVATION, { method: "POST", data: payload });
};
