import {
  GET_INVITED_MEMBERS_FAILED,
  GET_INVITED_MEMBERS_REQUEST,
  GET_INVITED_MEMBERS_SUCCESS,
} from "../../actions/invite/types";
import { put, takeLatest } from "redux-saga/effects";

import { getInvitedMembers } from "../../network/invite";

function* callGetInvitedMembers(action: { [Key: string]: any }) {
  try {
    const result = yield getInvitedMembers(
      action.id,
      action.queryString,
      action.page,
      action.size
    );
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_INVITED_MEMBERS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_INVITED_MEMBERS_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetInvitedMembers() {
  yield takeLatest(GET_INVITED_MEMBERS_REQUEST, callGetInvitedMembers);
}
