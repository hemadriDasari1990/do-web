import {
    DELETE_NOTE_FAILED,
    DELETE_NOTE_INTERNAL_SERVER_ERROR,
    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    GET_NOTES_BY_SECTION_FAILED,
    GET_NOTES_BY_SECTION_INTERNAL_SERVER_ERROR,
    GET_NOTES_BY_SECTION_REQUEST,
    GET_NOTES_BY_SECTION_SUCCESS,
    UPDATE_NOTE_FAILED,
    UPDATE_NOTE_INTERNAL_SERVER_ERROR,
    UPDATE_NOTE_REQUEST,
    UPDATE_NOTE_SUCCESS
} from "../../actions/note/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
    payload: any;
    error: any;
}

const initialState = {
    title: "",
    loading: false,
    response: null
}

const note = (state = initialState, action: ReduxAction) => {
    switch(action.type){
        case DELETE_NOTE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_NOTE_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_NOTE_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_NOTES_BY_SECTION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_NOTES_BY_SECTION_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_NOTES_BY_SECTION_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_NOTES_BY_SECTION_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_NOTE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_NOTE_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_NOTE_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default note;