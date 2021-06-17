import {
  GET_JOINED_MEMBERS_FAILED,
  GET_JOINED_MEMBERS_REQUEST,
  GET_JOINED_MEMBERS_SUCCESS,
  JOIN_MEMBER_TO_BOARD_FAILED,
  JOIN_MEMBER_TO_BOARD_REQUEST,
  JOIN_MEMBER_TO_BOARD_SUCCESS,
} from "../../actions/join/types";
import { getJoinedMembers, joinMemberToBoard } from "../../network/join";
import { put, takeLatest } from "redux-saga/effects";

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

function* callJoinMember(action: { [Key: string]: any }) {
  try {
    const result = yield joinMemberToBoard(action.payload);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: JOIN_MEMBER_TO_BOARD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: JOIN_MEMBER_TO_BOARD_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchJoinMember() {
  yield takeLatest(JOIN_MEMBER_TO_BOARD_REQUEST, callJoinMember);
}
