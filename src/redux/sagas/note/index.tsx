import {
    CREATE_NOTE_FAILED,
    CREATE_NOTE_INTERNAL_SERVER_ERROR,
    CREATE_NOTE_REQUEST,
    CREATE_NOTE_SUCCESS,
    DELETE_NOTE_FAILED,
    DELETE_NOTE_INTERNAL_SERVER_ERROR,
    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    UPDATE_NOTE_FAILED,
    UPDATE_NOTE_INTERNAL_SERVER_ERROR,
    UPDATE_NOTE_REQUEST,
    UPDATE_NOTE_SUCCESS
} from "../../actions/note/types";
import { createNote, deleteNote, updateNote } from "../../network/note";
import { put, takeLatest } from "redux-saga/effects";

function* callCreateNote(action: {[Key: string]: any}) {
    try {
        const result = yield createNote(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: CREATE_NOTE_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: CREATE_NOTE_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: CREATE_NOTE_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: CREATE_NOTE_FAILED, payload: err || err.message});
    }
}

export function* watchCreateNote(){
    yield takeLatest(CREATE_NOTE_REQUEST, callCreateNote);
}

function* callUpdateNote(action: {[Key: string]: any}) {
    try {
        const result = yield updateNote(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: UPDATE_NOTE_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: UPDATE_NOTE_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: UPDATE_NOTE_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: UPDATE_NOTE_FAILED, payload: err || err.message});
    }
}

export function* watchUpdateNote(){
    yield takeLatest(UPDATE_NOTE_REQUEST, callUpdateNote);
}

function* callDeleteNote(action: {[Key: string]: any}) {
    try {
        const result = yield deleteNote(action.id);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: DELETE_NOTE_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: DELETE_NOTE_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: DELETE_NOTE_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type:DELETE_NOTE_FAILED, payload: err || err.message});
    }
}

export function* watchDeleteNote(){
    yield takeLatest(DELETE_NOTE_REQUEST, callDeleteNote);
}

