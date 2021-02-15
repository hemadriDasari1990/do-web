import {
    DELETE_BOARD_FAILED,
    DELETE_BOARD_INTERNAL_SERVER_ERROR,
    DELETE_BOARD_REQUEST,
    DELETE_BOARD_SUCCESS,
    GET_BOARD_FAILED,
    GET_BOARD_INTERNAL_SERVER_ERROR,
    GET_BOARD_REQUEST,
    GET_BOARD_SUCCESS,
    UPDATE_BOARD_FAILED,
    UPDATE_BOARD_INTERNAL_SERVER_ERROR,
    UPDATE_BOARD_REQUEST,
    UPDATE_BOARD_SUCCESS
} from "../../actions/board/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
    payload: any;
    error: any;
}

const initialState = {
    title: "",
    description: "",
    loading: false,
    noOfSections: 0,
    response: null
}

const board = (state = initialState, action: ReduxAction) => {
    switch(action.type){
        case DELETE_BOARD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_BOARD_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_BOARD_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_BOARD_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_BOARD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_BOARD_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_BOARD_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_BOARD_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_BOARD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_BOARD_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_BOARD_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_BOARD_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default board;