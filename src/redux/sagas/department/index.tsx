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
import { deleteDepartment, getDepartmentsByOrganization, updateDepartment } from "../../network/department";
import { put, takeLatest } from "redux-saga/effects";

function* callGetDepartmentsByOrganization(action: {[Key: string]: any}) {
    try {
        const result = yield getDepartmentsByOrganization(action.id);
        const { status, data } = result;
        if(status === 200){
            yield put({ type: GET_DEPARTMENT_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: GET_DEPARTMENT_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: GET_DEPARTMENT_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: GET_DEPARTMENT_FAILED, payload: err || err.message});
    }
}

export function* watchGetDepartmentsByOrganization(){
    yield takeLatest(GET_DEPARTMENT_REQUEST, callGetDepartmentsByOrganization);
}

function* callUpdateDepartment(action: {[Key: string]: any}) {
    try {
        const result = yield updateDepartment(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: UPDATE_DEPARTMENT_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: UPDATE_DEPARTMENT_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: UPDATE_DEPARTMENT_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: UPDATE_DEPARTMENT_FAILED, payload: err || err.message});
    }
}

export function* watchUpdateDepartment(){
    yield takeLatest(UPDATE_DEPARTMENT_REQUEST, callUpdateDepartment);
}

function* callDeleteDepartment(action: {[Key: string]: any}) {
    try {
        const result = yield deleteDepartment(action.id);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: DELETE_DEPARTMENT_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: DELETE_DEPARTMENT_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: DELETE_DEPARTMENT_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type:DELETE_DEPARTMENT_FAILED, payload: err || err.message});
    }
}

export function* watchDeleteDepartment(){
    yield takeLatest(DELETE_DEPARTMENT_REQUEST, callDeleteDepartment);
}

