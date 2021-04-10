import {
  CREATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  GET_ALL_SUMMARY_REQUEST,
  GET_BOARDS_BY_USER_REQUEST,
  GET_USERS_REQUEST,
  GET_USER_REQUEST,
  GET_USER_SUMMARY_REQUEST,
  UPDATE_USER_REQUEST,
} from "./types";

export const getUserDetails = (userId: string) => {
  return {
    type: GET_USER_REQUEST,
    id: userId,
  };
};

export const createUser = (payload: { [Key: string]: any }) => {
  return {
    type: CREATE_USER_REQUEST,
    url: `/user`,
    payload: payload,
  };
};

export const updateUser = (payload: { [Key: string]: any }) => {
  return {
    type: UPDATE_USER_REQUEST,
    url: `/user`,
    payload: payload,
  };
};

export const deleteUser = (userId: string) => {
  return {
    type: DELETE_USER_REQUEST,
    url: `/user/${userId}`,
  };
};

export const getUserSummary = (userId: string) => {
  return {
    type: GET_USER_SUMMARY_REQUEST,
    id: userId,
  };
};

export const getAllSummary = () => {
  return {
    type: GET_ALL_SUMMARY_REQUEST,
  };
};

export const getUsers = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};

export const getBoardsByUser = (id: string, limit: number) => {
  return {
    type: GET_BOARDS_BY_USER_REQUEST,
    id,
    limit,
  };
};
