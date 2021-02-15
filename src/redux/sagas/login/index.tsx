import {
    LOGIN_FAILED,
    LOGIN_INTERNAL_SERVER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../../actions/login/types";
import { put, takeLatest } from "redux-saga/effects";

import { login } from "../../network/login";

function* callLogin(action: {[Key: string]: any}) {
    try {
        const result = yield login(action.payload);
        const { status, data } = result;
        if(status === 200 && data?.token){
            sessionStorage.setItem("token", data?.token);
            yield put({ type: LOGIN_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: LOGIN_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: LOGIN_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: LOGIN_FAILED, payload: err || err.message});
    }
}

export function* watchLogin(){
    yield takeLatest(LOGIN_REQUEST, callLogin);
}