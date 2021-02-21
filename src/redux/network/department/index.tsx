import { DELETE_DEPARTMENT, GET_DEPARTMENT_DETAILS, UPDATE_DEPARTMENT } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getDepartmentDetails = (id: string) => {
    return API(replaceStr(GET_DEPARTMENT_DETAILS, "{id}", id), { method: 'GET' });
}

export const updateDepartment = (payload: {[Key: string]: any}) => {
    return API(UPDATE_DEPARTMENT, { method: 'PUT', data: payload });
}

export const deleteDepartment = (id: string) => {
    return API(replaceStr(DELETE_DEPARTMENT, "{id}", id), { method: 'DELETE' });
}