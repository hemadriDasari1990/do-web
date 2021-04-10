import {
  DELETE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getProjects = (
  userId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return API(
    GET_PROJECTS +
      `?userId=${userId}&queryString=${queryString}&page=${page}&size=${size}`,
    {
      method: "GET",
    }
  );
};

export const updateProject = (payload: { [Key: string]: any }) => {
  return API(UPDATE_PROJECT, { method: "PUT", data: payload });
};

export const deleteProject = (id: string) => {
  return API(replaceStr(DELETE_PROJECT, "{id}", id), { method: "DELETE" });
};
