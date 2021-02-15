import {
    CREATE_SECTION_REQUEST,
    DELETE_SECTION_REQUEST,
    GET_SECTIONS_BY_BOARD_REQUEST,
    UPDATE_SECTION_REQUEST
} from "./types";

export const getSectionsByBoard = (boardId: string) => {
    return {
        type: GET_SECTIONS_BY_BOARD_REQUEST,
        id: boardId
    }
}

export const createSection = (payload: {[Key: string]: any}) => {
    return {
        type: CREATE_SECTION_REQUEST,
        payload: payload
    }
}

export const updateSection = (payload: {[Key: string]: any}) => {
    return {
        type: UPDATE_SECTION_REQUEST,
        payload: payload
    }
}

export const deleteSection = (sectionId: string) => {
    return {
        type: DELETE_SECTION_REQUEST,
        id: sectionId
    }
}
