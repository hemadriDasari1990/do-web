import { CREATE_BOARD, DELETE_BOARD, GET_BOARD_DETAILS, UPDATE_BOARD } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getBoardDetails = (id: string) => {
    return API(replaceStr(GET_BOARD_DETAILS, "{id}", id), { method: 'GET' });
}

export const createBoard = (payload: {[Key: string]: any}) => {
    return API(CREATE_BOARD, { method: 'POST', data: payload });
}

export const updateBoard = (id: string, payload: {[Key: string]: any}) => {
    return API(replaceStr(UPDATE_BOARD, "{id}", id), { method: 'PUT', data: payload });
}

export const deleteBoard = (id: string) => {
    return API(replaceStr(DELETE_BOARD, "{id}", id), { method: 'DELETE' });
}