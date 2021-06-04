import {
  GET_ACTION_ITEMS_BY_ACTION_FAILED,
  GET_ACTION_ITEMS_BY_ACTION_REQUEST,
  GET_ACTION_ITEMS_BY_ACTION_SUCCESS,
} from "../../actions/actionItem/types";
import { put, takeEvery } from "redux-saga/effects";

import { getActionItemsByAction } from "../../network/actionItem";

function* callGetActionItemsByAction(action: { [Key: string]: any }) {
  try {
    const result = yield getActionItemsByAction(action.sectionId);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_ACTION_ITEMS_BY_ACTION_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: GET_ACTION_ITEMS_BY_ACTION_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchGetActionItemsByAction() {
  yield takeEvery(
    GET_ACTION_ITEMS_BY_ACTION_REQUEST,
    callGetActionItemsByAction
  );
}
