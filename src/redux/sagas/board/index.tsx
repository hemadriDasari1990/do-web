import {
    CREATE_BOARD_FAILED,
    CREATE_BOARD_INTERNAL_SERVER_ERROR,
    CREATE_BOARD_REQUEST,
    CREATE_BOARD_SUCCESS,
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
import { createBoard, deleteBoard, getBoardDetails, updateBoard } from "../../network/board";
import { put, takeLatest } from "redux-saga/effects";

function* callGetBoardDetails(action: {[Key: string]: any}) {
    try {
        const result = yield getBoardDetails(action.id);
        const { status, data } = result;
        if(status === 200){
            yield put({ type: GET_BOARD_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: GET_BOARD_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: GET_BOARD_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: GET_BOARD_FAILED, payload: err || err.message});
    }
}

export function* watchGetBoardDetails(){
    yield takeLatest(GET_BOARD_REQUEST, callGetBoardDetails);
}

function* callCreateBoard(action: {[Key: string]: any}) {
    try {
        const result = yield createBoard(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: CREATE_BOARD_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: CREATE_BOARD_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: CREATE_BOARD_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: CREATE_BOARD_FAILED, payload: err || err.message});
    }
}

export function* watchCreateBoard(){
    yield takeLatest(CREATE_BOARD_REQUEST, callCreateBoard);
}

function* callUpdateBoard(action: {[Key: string]: any}) {
    try {
        const result = yield updateBoard(action.id, action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: UPDATE_BOARD_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: UPDATE_BOARD_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: UPDATE_BOARD_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: UPDATE_BOARD_FAILED, payload: err || err.message});
    }
}

export function* watchUpdateBoard(){
    yield takeLatest(UPDATE_BOARD_REQUEST, callUpdateBoard);
}

function* callDeleteBoard(action: {[Key: string]: any}) {
    try {
        const result = yield deleteBoard(action.id);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: DELETE_BOARD_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: DELETE_BOARD_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: DELETE_BOARD_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type:DELETE_BOARD_FAILED, payload: err || err.message});
    }
}

export function* watchDeleteBoard(){
    yield takeLatest(DELETE_BOARD_REQUEST, callDeleteBoard);
}

