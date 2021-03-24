import {
  GET_SECTIONS_BY_BOARD_FAILED,
  GET_SECTIONS_BY_BOARD_REQUEST,
  GET_SECTIONS_BY_BOARD_SUCCESS,
} from "../../actions/section/types";
import { getSectionsByBoard } from "../../network/section";
import { put, takeLatest } from "redux-saga/effects";

function* callGetSectionsByBoard(action: { [Key: string]: any }) {
  try {
    const result = yield getSectionsByBoard(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_SECTIONS_BY_BOARD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_SECTIONS_BY_BOARD_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetSectionsByBoard() {
  yield takeLatest(GET_SECTIONS_BY_BOARD_REQUEST, callGetSectionsByBoard);
}
