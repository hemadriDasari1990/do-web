import { CREATE_ORGANIZATION, DELETE_ORGANIZATION, GET_ORGANIZATION_DETAILS, UPDATE_ORGANIZATION } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getOrganizationDetails = (id: string) => {
    return API(replaceStr(GET_ORGANIZATION_DETAILS, "{id}", id), { method: 'GET' });
}

export const createOrganization = (payload: {[Key: string]: any}) => {
    return API(CREATE_ORGANIZATION, { method: 'POST', data: payload });
}

export const updateOrganization = (id: string, payload: {[Key: string]: any}) => {
    return API(replaceStr(UPDATE_ORGANIZATION, "{id}", id), { method: 'PUT', data: payload });
}

export const deleteOrganization = (id: string) => {
    return API(replaceStr(DELETE_ORGANIZATION, "{id}", id), { method: 'DELETE' });
}