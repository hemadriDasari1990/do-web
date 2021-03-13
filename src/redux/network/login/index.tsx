import {
  FORGOT_PASSWORD,
  LOGIN,
  RESEND_TOKEN,
  RESET_PASSWORD,
  VALIDATE_FORGOT_PASSWORD,
  VERIFY_TOKEN,
} from "../../../network/endpoints";

import API from "../../../network";

export const login = async (payload: { [Key: string]: any }) => {
  return await API(LOGIN, { method: "POST", data: payload });
};

export const verifyToken = async (payload: { [Key: string]: any }) => {
  return await API(VERIFY_TOKEN, { method: "POST", data: payload });
};

export const resendToken = async (payload: { [Key: string]: any }) => {
  return await API(RESEND_TOKEN, { method: "POST", data: payload });
};

export const forgotPassword = async (payload: { [Key: string]: any }) => {
  return await API(FORGOT_PASSWORD, { method: "POST", data: payload });
};

export const validateForgotPassword = async (payload: {
  [Key: string]: any;
}) => {
  return await API(VALIDATE_FORGOT_PASSWORD, { method: "POST", data: payload });
};

export const resetPassword = async (payload: { [Key: string]: any }) => {
  return await API(RESET_PASSWORD, { method: "POST", data: payload });
};
