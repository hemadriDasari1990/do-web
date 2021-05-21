import {
  GET_DEFAULT_SECTIONS_SUCCESS,
  GET_DEFAULT_SECTIONS_REQUEST,
  GET_DEFAULT_SECTIONS_FAILED,
} from "../../actions/common/types";
import { getDefaultSections } from "../../network/common";
import { put, takeLatest } from "redux-saga/effects";

function* callGetDefaultSections() {
  try {
    const result = yield getDefaultSections();
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_DEFAULT_SECTIONS_SUCCESS,
        data: data,
      });
    }
  } catch (err) {
    yield put({
      type: GET_DEFAULT_SECTIONS_FAILED,
      data: err.response.data,
    });
  }
}

export function* watchGetDefaultSections() {
  yield takeLatest(GET_DEFAULT_SECTIONS_REQUEST, callGetDefaultSections);
}
