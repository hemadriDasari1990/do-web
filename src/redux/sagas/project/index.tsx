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
import { deleteProject, getProjectDetails, updateProject } from "../../network/project";
import { put, takeLatest } from "redux-saga/effects";

function* callGetProjectDetails(action: {[Key: string]: any}) {
    try {
        const result = yield getProjectDetails(action.id);
        const { status, data } = result;
        if(status === 200){
            yield put({ type: GET_PROJECT_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: GET_PROJECT_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: GET_PROJECT_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: GET_PROJECT_FAILED, payload: err || err.message});
    }
}

export function* watchGetProjectDetails(){
    yield takeLatest(GET_PROJECT_REQUEST, callGetProjectDetails);
}

function* callUpdateProject(action: {[Key: string]: any}) {
    try {
        const result = yield updateProject(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: UPDATE_PROJECT_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: UPDATE_PROJECT_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: UPDATE_PROJECT_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: UPDATE_PROJECT_FAILED, payload: err || err.message});
    }
}

export function* watchUpdateProject(){
    yield takeLatest(UPDATE_PROJECT_REQUEST, callUpdateProject);
}

function* callDeleteProject(action: {[Key: string]: any}) {
    try {
        const result = yield deleteProject(action.id);
        const { status, data } = result;
        if(status === 200 && data?.deleted){
            yield put({ type: DELETE_PROJECT_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: DELETE_PROJECT_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: DELETE_PROJECT_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type:DELETE_PROJECT_FAILED, payload: err || err.message});
    }
}

export function* watchDeleteProject(){
    yield takeLatest(DELETE_PROJECT_REQUEST, callDeleteProject);
}

