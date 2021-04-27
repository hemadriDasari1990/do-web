import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_SUMMARY,
  GET_BOARDS_BY_USER,
  GET_USERS,
  GET_USER_DETAILS,
  GET_USER_SUMMARY,
  UPDATE_AVATAR,
  UPDATE_EMAIL,
  UPDATE_NAME,
  UPDATE_PASSWORD,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export function getUserDetails(id: string) {
  return API(replaceStr(GET_USER_DETAILS, "{id}", id), {
    method: "GET",
  });
}

export const createUser = (payload: { [Key: string]: any }) => {
  return API(CREATE_USER, { method: "POST", data: payload });
};

export const updateName = (payload: { [Key: string]: any }) => {
  return API(UPDATE_NAME, {
    method: "PUT",
    data: payload,
  });
};

export const updateEmail = (payload: { [Key: string]: any }) => {
  return API(UPDATE_EMAIL, {
    method: "PUT",
    data: payload,
  });
};

export const updatePassword = (payload: { [Key: string]: any }) => {
  return API(UPDATE_PASSWORD, {
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

export const getBoardsByUser = (userId: string, limit: number) => {
  return API(
    replaceStr(GET_BOARDS_BY_USER, "{id}", userId) + `?limit=${limit}`,
    {
      method: "GET",
    }
  );
};

export const updateAvatar = (payload: { [Key: string]: any }) => {
  return API(UPDATE_AVATAR, { method: "PUT", data: payload });
};
