import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_SUMMARY,
  GET_USERS,
  GET_USER_DETAILS,
  GET_USER_SUMMARY,
  UPDATE_USER,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getUserDetails = (id: string) => {
  return API(replaceStr(GET_USER_DETAILS, "{id}", id), {
    method: "GET",
  });
};

export const createUser = (payload: { [Key: string]: any }) => {
  return API(CREATE_USER, { method: "POST", data: payload });
};

export const updateUser = (id: string, payload: { [Key: string]: any }) => {
  return API(replaceStr(UPDATE_USER, "{id}", id), {
    method: "PUT",
    data: payload,
  });
};

export const deleteUser = (id: string) => {
  return API(replaceStr(DELETE_USER, "{id}", id), { method: "DELETE" });
};

export const getUserSummary = (id: string) => {
  return API(replaceStr(GET_USER_SUMMARY, "{id}", id), {
    method: "GET",
  });
};

export const getAllSummary = () => {
  return API(GET_ALL_SUMMARY, {
    method: "GET",
  });
};

export const getUsers = () => {
  return API(GET_USERS, {
    method: "GET",
  });
};
