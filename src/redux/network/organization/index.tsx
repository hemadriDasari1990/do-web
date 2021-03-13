import {
  CREATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  GET_ALL_SUMMARY,
  GET_ORGANIZATIONS,
  GET_ORGANIZATION_DETAILS,
  GET_ORGANIZATION_SUMMARY,
  UPDATE_ORGANIZATION,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getOrganizationDetails = (id: string) => {
  return API(replaceStr(GET_ORGANIZATION_DETAILS, "{id}", id), {
    method: "GET",
  });
};

export const createOrganization = (payload: { [Key: string]: any }) => {
  return API(CREATE_ORGANIZATION, { method: "POST", data: payload });
};

export const updateOrganization = (
  id: string,
  payload: { [Key: string]: any }
) => {
  return API(replaceStr(UPDATE_ORGANIZATION, "{id}", id), {
    method: "PUT",
    data: payload,
  });
};

export const deleteOrganization = (id: string) => {
  return API(replaceStr(DELETE_ORGANIZATION, "{id}", id), { method: "DELETE" });
};

export const getOrganizationSummary = (id: string) => {
  return API(replaceStr(GET_ORGANIZATION_SUMMARY, "{id}", id), {
    method: "GET",
  });
};

export const getAllSummary = () => {
  return API(GET_ALL_SUMMARY, {
    method: "GET",
  });
};

export const getOrganizations = () => {
  return API(GET_ORGANIZATIONS, {
    method: "GET",
  });
};
