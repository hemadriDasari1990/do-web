import { CREATE_NOTE, DELETE_NOTE, GET_NOTES_BY_SECTION_DETAILS, UPDATE_NOTE } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getNoteDetails = (id: string) => {
    return API(replaceStr(GET_NOTES_BY_SECTION_DETAILS, "{id}", id), { method: 'GET' });
}

export const createNote = (payload: {[Key: string]: any}) => {
    return API(CREATE_NOTE, { method: 'POST', data: payload });
}

export const updateNote = (payload: {[Key: string]: any}) => {
    return API(UPDATE_NOTE, { method: 'PUT', data: payload });
}

export const deleteNote = (id: string) => {
    return API(replaceStr(DELETE_NOTE, "{id}", id), { method: 'DELETE' });
}