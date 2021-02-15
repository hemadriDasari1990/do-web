import {
    CREATE_ORGANIZATION_FAILED,
    CREATE_ORGANIZATION_INTERNAL_SERVER_ERROR,
    CREATE_ORGANIZATION_REQUEST,
    CREATE_ORGANIZATION_SUCCESS,
    DELETE_ORGANIZATION_FAILED,
    DELETE_ORGANIZATION_INTERNAL_SERVER_ERROR,
    DELETE_ORGANIZATION_REQUEST,
    DELETE_ORGANIZATION_SUCCESS,
    GET_ORGANIZATION_FAILED,
    GET_ORGANIZATION_INTERNAL_SERVER_ERROR,
    GET_ORGANIZATION_REQUEST,
    GET_ORGANIZATION_SUCCESS,
    UPDATE_ORGANIZATION_FAILED,
    UPDATE_ORGANIZATION_INTERNAL_SERVER_ERROR,
    UPDATE_ORGANIZATION_REQUEST,
    UPDATE_ORGANIZATION_SUCCESS
} from "../../actions/organization/types";
import { createOrganization, deleteOrganization, getOrganizationDetails, updateOrganization } from "../../network/organization";
import { put, takeLatest } from "redux-saga/effects";

function* callGetOrganizationDetails(action: {[Key: string]: any}) {
    try {
        const result = yield getOrganizationDetails(action.id);
        const { status, data } = result;
        if(status === 200){
            yield put({ type: GET_ORGANIZATION_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: GET_ORGANIZATION_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: GET_ORGANIZATION_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: GET_ORGANIZATION_FAILED, payload: err || err.message});
    }
}

export function* watchGetOrganizationDetails(){
    yield takeLatest(GET_ORGANIZATION_REQUEST, callGetOrganizationDetails);
}

function* callCreateOrganization(action: {[Key: string]: any}) {
    try {
        const result = yield createOrganization(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: CREATE_ORGANIZATION_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: CREATE_ORGANIZATION_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: CREATE_ORGANIZATION_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: CREATE_ORGANIZATION_FAILED, payload: err || err.message});
    }
}

export function* watchCreateOrganization(){
    yield takeLatest(CREATE_ORGANIZATION_REQUEST, callCreateOrganization);
}

function* callUpdateOrganization(action: {[Key: string]: any}) {
    try {
        const result = yield updateOrganization(action.id, action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: UPDATE_ORGANIZATION_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: UPDATE_ORGANIZATION_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: UPDATE_ORGANIZATION_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: UPDATE_ORGANIZATION_FAILED, payload: err || err.message});
    }
}

export function* watchUpdateOrganization(){
    yield takeLatest(UPDATE_ORGANIZATION_REQUEST, callUpdateOrganization);
}

function* callDeleteOrganization(action: {[Key: string]: any}) {
    try {
        const result = yield deleteOrganization(action.id);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: DELETE_ORGANIZATION_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: DELETE_ORGANIZATION_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: DELETE_ORGANIZATION_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type:DELETE_ORGANIZATION_FAILED, payload: err || err.message});
    }
}

export function* watchDeleteOrganization(){
    yield takeLatest(DELETE_ORGANIZATION_REQUEST, callDeleteOrganization);
}

