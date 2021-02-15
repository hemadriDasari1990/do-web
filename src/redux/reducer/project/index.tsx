import {
    DELETE_PROJECT_FAILED,
    DELETE_PROJECT_INTERNAL_SERVER_ERROR,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    GET_PROJECT_FAILED,
    GET_PROJECT_INTERNAL_SERVER_ERROR,
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILED,
    UPDATE_PROJECT_INTERNAL_SERVER_ERROR,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS
} from "../../actions/project/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
    payload: any;
    error: any;
}

const initialState = {
    title: "",
    description: "",
    loading: false,
    response: null
}

const project = (state = initialState, action: ReduxAction) => {
    switch(action.type){
        case DELETE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_PROJECT_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_PROJECT_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_PROJECT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PROJECT_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_PROJECT_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PROJECT_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_PROJECT_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default project;