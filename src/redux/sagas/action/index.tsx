import {
  GET_ACTION_BY_BOARD_FAILED,
  GET_ACTION_BY_BOARD_REQUEST,
  GET_ACTION_BY_BOARD_SUCCESS,
} from "../../actions/action/types";
import { put, takeLatest } from "redux-saga/effects";
import { getActionByBoard } from "../../network/action";

function* callGetActionByBoard(action: { [Key: string]: any }) {
  try {
    const result = yield getActionByBoard(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_ACTION_BY_BOARD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_ACTION_BY_BOARD_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetActionByBoard() {
  yield takeLatest(GET_ACTION_BY_BOARD_REQUEST, callGetActionByBoard);
}
