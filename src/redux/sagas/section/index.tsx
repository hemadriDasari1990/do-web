import {
    DELETE_SECTION_FAILED,
    DELETE_SECTION_INTERNAL_SERVER_ERROR,
    DELETE_SECTION_REQUEST,
    DELETE_SECTION_SUCCESS,
    GET_SECTIONS_BY_BOARD_FAILED,
    GET_SECTIONS_BY_BOARD_INTERNAL_SERVER_ERROR,
    GET_SECTIONS_BY_BOARD_REQUEST,
    GET_SECTIONS_BY_BOARD_SUCCESS,
    UPDATE_SECTION_FAILED,
    UPDATE_SECTION_INTERNAL_SERVER_ERROR,
    UPDATE_SECTION_REQUEST,
    UPDATE_SECTION_SUCCESS
} from "../../actions/section/types";
import { deleteSection, getSectionsByBoard, updateSection } from "../../network/section";
import { put, takeLatest } from "redux-saga/effects";

function* callGetSectionsByBoard(action: {[Key: string]: any}) {
    try {
        const result = yield getSectionsByBoard(action.id);
        const { status, data } = result;
        if(status === 200){
            yield put({ type: GET_SECTIONS_BY_BOARD_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: GET_SECTIONS_BY_BOARD_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: GET_SECTIONS_BY_BOARD_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: GET_SECTIONS_BY_BOARD_FAILED, payload: err || err.message});
    }
}

export function* watchGetSectionsByBoard(){
    yield takeLatest(GET_SECTIONS_BY_BOARD_REQUEST, callGetSectionsByBoard);
}

function* callUpdateSection(action: {[Key: string]: any}) {
    try {
        const result = yield updateSection(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: UPDATE_SECTION_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: UPDATE_SECTION_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: UPDATE_SECTION_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: UPDATE_SECTION_FAILED, payload: err || err.message});
    }
}

export function* watchUpdateSection(){
    yield takeLatest(UPDATE_SECTION_REQUEST, callUpdateSection);
}

function* callDeleteSection(action: {[Key: string]: any}) {
    try {
        const result = yield deleteSection(action.id);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: DELETE_SECTION_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: DELETE_SECTION_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: DELETE_SECTION_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type:DELETE_SECTION_FAILED, payload: err || err.message});
    }
}

export function* watchDeleteSection(){
    yield takeLatest(DELETE_SECTION_REQUEST, callDeleteSection);
}
