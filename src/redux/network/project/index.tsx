import { DELETE_PROJECT, GET_PROJECTS_BY_ORGANIZATION, UPDATE_PROJECT } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getProjectsByOrganization = (id: string) => {
    return API(replaceStr(GET_PROJECTS_BY_ORGANIZATION, "{id}", id), { method: 'GET' });
}

export const updateProject = (payload: {[Key: string]: any}) => {
    return API(UPDATE_PROJECT, { method: 'PUT', data: payload });
}

export const deleteProject = (id: string) => {
    return API(replaceStr(DELETE_PROJECT, "{id}", id), { method: 'DELETE' });
}