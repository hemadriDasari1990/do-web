import {
    CREATE_BOARD_REQUEST,
    DELETE_BOARD_REQUEST,
    GET_BOARD_REQUEST,
    UPDATE_BOARD_REQUEST
} from "./types";

export const getBoardDetails = (boarId: string) => {
    return {
        type: GET_BOARD_REQUEST,
        id: boarId
    }
}

export const createBoard = (payload: {[Key: string]: any}) => {
    return {
        type: CREATE_BOARD_REQUEST,
        url: `/board`,
        payload: payload
    }
}

export const updateBoard = (boarId: string, payload: {[Key: string]: any}) => {
    return {
        type: UPDATE_BOARD_REQUEST,
        url: `/board/${boarId}`,
        payload: payload
    }
}

export const deleteBoard = (boarId: string) => {
    return {
        type: DELETE_BOARD_REQUEST,
        url: `/board/${boarId}`
    }
}
