import {
    LOGIN_FAILED,
    LOGIN_INTERNAL_SERVER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../../actions/login/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
    payload: any;
    error: any;
}

const initialState = {
    token: null,
    loading: false,
    response: null
}

const login = (state = initialState, action: ReduxAction) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case LOGIN_INTERNAL_SERVER_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default login;