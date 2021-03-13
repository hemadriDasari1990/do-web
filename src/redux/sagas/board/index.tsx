import {
  DELETE_BOARD_FAILED,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  GET_BOARD_FAILED,
  GET_BOARD_REQUEST,
  GET_BOARD_SUCCESS,
  START_OR_COMPLETE_BOARD_FAILED,
  START_OR_COMPLETE_BOARD_REQUEST,
  START_OR_COMPLETE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILED,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
} from "../../actions/board/types";
import {
  deleteBoard,
  getBoardDetails,
  startOrCompleteBoard,
  updateBoard,
} from "../../network/board";
import { put, takeLatest } from "redux-saga/effects";

function* callGetBoardDetails(action: { [Key: string]: any }) {
  try {
    const result = yield getBoardDetails(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_BOARD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_BOARD_FAILED, payload: err.response.data });
  }
}

export function* watchGetBoardDetails() {
  yield takeLatest(GET_BOARD_REQUEST, callGetBoardDetails);
}

function* callUpdateBoard(action: { [Key: string]: any }) {
  try {
    const result = yield updateBoard(action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: UPDATE_BOARD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: UPDATE_BOARD_FAILED, payload: err.response.data });
  }
}

export function* watchUpdateBoard() {
  yield takeLatest(UPDATE_BOARD_REQUEST, callUpdateBoard);
}

function* callDeleteBoard(action: { [Key: string]: any }) {
  try {
    const result = yield deleteBoard(action.id);
    const { status, data } = result;
    if (status === 200 && data?.deleted) {
      yield put({ type: DELETE_BOARD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: DELETE_BOARD_FAILED, payload: err.response.data });
  }
}

export function* watchDeleteBoard() {
  yield takeLatest(DELETE_BOARD_REQUEST, callDeleteBoard);
}

function* callStartOrCompleteBoard(action: { [Key: string]: any }) {
  try {
    const result = yield startOrCompleteBoard(action.action, action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: START_OR_COMPLETE_BOARD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: START_OR_COMPLETE_BOARD_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchStartOrCompleteBoard() {
  yield takeLatest(START_OR_COMPLETE_BOARD_REQUEST, callStartOrCompleteBoard);
}
