import {
    CREATE_NOTE_REQUEST,
    DELETE_NOTE_REQUEST,
    GET_NOTES_BY_SECTION_REQUEST,
    UPDATE_NOTE_REQUEST
} from "./types";

export const getNotesBySectionId = (noteId: string) => {
    return {
        type: GET_NOTES_BY_SECTION_REQUEST,
        url: `/note/${noteId}`
    }
}

export const createNote = (payload: {[Key: string]: any}) => {
    return {
        type: CREATE_NOTE_REQUEST,
        url: `/note`,
        payload: payload
    }
}

export const updateNote = (payload: {[Key: string]: any}) => {
    return {
        type: UPDATE_NOTE_REQUEST,
        url: `/note`,
        payload: payload
    }
}

export const deleteNote = (noteId: string) => {
    return {
        type: DELETE_NOTE_REQUEST,
        id: noteId
    }
}
