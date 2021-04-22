import {
  DELETE_BOARD_FAILED,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  GET_BOARDS_FAILED,
  GET_BOARDS_REQUEST,
  GET_BOARDS_SUCCESS,
  GET_BOARD_ACTIVITIES_FAILED,
  GET_BOARD_ACTIVITIES_REQUEST,
  GET_BOARD_ACTIVITIES_SUCCESS,
  GET_BOARD_FAILED,
  GET_BOARD_REQUEST,
  GET_BOARD_SUCCESS,
  UPDATE_BOARD_FAILED,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
} from "../../actions/board/types";
import {
  deleteBoard,
  getBoardActivities,
  getBoardDetails,
  getBoards,
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

function* callGetBoards(action: { [Key: string]: any }) {
  try {
    const result = yield getBoards(
      action.id,
      action.queryString,
      action.page,
      action.size
    );
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_BOARDS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_BOARDS_FAILED, payload: err.response.data });
  }
}

export function* watchGetBoards() {
  yield takeLatest(GET_BOARDS_REQUEST, callGetBoards);
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

function* callGetBoardActivities(action: { [Key: string]: any }) {
  try {
    const result = yield getBoardActivities(
      action.id,
      action.queryString,
      action.page,
      action.size
    );
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_BOARD_ACTIVITIES_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_BOARD_ACTIVITIES_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetBoardActivities() {
  yield takeLatest(GET_BOARD_ACTIVITIES_REQUEST, callGetBoardActivities);
}
