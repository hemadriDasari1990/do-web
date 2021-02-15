import {
    DELETE_DEPARTMENT_FAILED,
    DELETE_DEPARTMENT_INTERNAL_SERVER_ERROR,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    GET_DEPARTMENT_FAILED,
    GET_DEPARTMENT_INTERNAL_SERVER_ERROR,
    GET_DEPARTMENT_REQUEST,
    GET_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAILED,
    UPDATE_DEPARTMENT_INTERNAL_SERVER_ERROR,
    UPDATE_DEPARTMENT_REQUEST,
    UPDATE_DEPARTMENT_SUCCESS
} from "../../actions/department/types";

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

const department = (state = initialState, action: ReduxAction) => {
    switch(action.type){
        case DELETE_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_DEPARTMENT_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case DELETE_DEPARTMENT_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_DEPARTMENT_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_DEPARTMENT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case GET_DEPARTMENT_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_DEPARTMENT_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case UPDATE_DEPARTMENT_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default department;