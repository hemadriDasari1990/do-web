import { LOGIN, RESEND_TOKEN, VERIFY_TOKEN } from "../../../network/endpoints";

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
