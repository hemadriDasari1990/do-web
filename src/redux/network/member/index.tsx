import {
  DELETE_MEMBER,
  GET_MEMBERS_BY_USER,
  GET_MEMBER_DETAILS,
  UPDATE_MEMBER,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getMemberDetails = (id: string) => {
  return API(replaceStr(GET_MEMBER_DETAILS, "{id}", id), { method: "GET" });
};

export const getMembersByUser = (
  id: string,
  queryString: string,
  page: number,
  size: number
) => {
  const url: string = `${replaceStr(
    GET_MEMBERS_BY_USER,
    "{id}",
    id
  )}&queryString=${queryString}&page=${page}&size=${size}`;
  return API(url, { method: "GET" });
};

export const updateMember = (payload: { [Key: string]: any }) => {
  return API(UPDATE_MEMBER, { method: "PUT", data: payload });
};

export const deleteMember = (id: string) => {
  return API(replaceStr(DELETE_MEMBER, "{id}", id), { method: "DELETE" });
};
