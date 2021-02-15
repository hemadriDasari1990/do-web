import { DELETE_DEPARTMENT, GET_DEPARTMENTS_BY_ORGANIZATION, UPDATE_DEPARTMENT } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getDepartmentsByOrganization = (id: string) => {
    return API(replaceStr(GET_DEPARTMENTS_BY_ORGANIZATION, "{id}", id), { method: 'GET' });
}

export const updateDepartment = (payload: {[Key: string]: any}) => {
    return API(UPDATE_DEPARTMENT, { method: 'PUT', data: payload });
}

export const deleteDepartment = (id: string) => {
    return API(replaceStr(DELETE_DEPARTMENT, "{id}", id), { method: 'DELETE' });
}