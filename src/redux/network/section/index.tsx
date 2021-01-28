import { CREATE_SECTION, DELETE_SECTION, GET_SECTIONS_BY_BOARD, UPDATE_SECTION } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getSectionsByBoard = (id: string) => {
    return API(replaceStr(GET_SECTIONS_BY_BOARD, "{id}", id), { method: 'GET' });
}

export const createSection = (payload: {[Key: string]: any}) => {
    return API(CREATE_SECTION, { method: 'POST', data: payload });
}

export const updateSection = (id: string, payload: {[Key: string]: any}) => {
    return API(replaceStr(UPDATE_SECTION, "{id}", id), { method: 'PUT', data: payload });
}

export const deleteSection = (id: string) => {
    return API(replaceStr(DELETE_SECTION, "{id}", id), { method: 'DELETE' });
}