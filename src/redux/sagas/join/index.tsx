import {
  GET_JOINED_MEMBERS_FAILED,
  GET_JOINED_MEMBERS_REQUEST,
  GET_JOINED_MEMBERS_SUCCESS,
} from "../../actions/join/types";
import { put, takeLatest } from "redux-saga/effects";

import { getJoinedMembers } from "../../network/join";

function* callGetJoinedMembers(action: { [Key: string]: any }) {
  try {
    const result = yield getJoinedMembers(
      action.id,
      action.queryString,
      action.page,
      action.size
    );
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_JOINED_MEMBERS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_JOINED_MEMBERS_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchGetJoinedMembers() {
  yield takeLatest(GET_JOINED_MEMBERS_REQUEST, callGetJoinedMembers);
}
