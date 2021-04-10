import {
  DELETE_MEMBER_FAILED,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  GET_MEMBERS_BY_USER_FAILED,
  GET_MEMBERS_BY_USER_REQUEST,
  GET_MEMBERS_BY_USER_SUCCESS,
  GET_MEMBER_FAILED,
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILED,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
} from "../../actions/member/types";
import {
  deleteMember,
  getMemberDetails,
  getMembersByUser,
  updateMember,
} from "../../network/member";
import { put, takeLatest } from "redux-saga/effects";

function* callGetMemberDetails(action: { [Key: string]: any }) {
  try {
    const result = yield getMemberDetails(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_MEMBER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_MEMBER_FAILED, payload: err.response.data });
  }
}

export function* watchGetMemberDetails() {
  yield takeLatest(GET_MEMBER_REQUEST, callGetMemberDetails);
}

function* callGetMembersByUser(action: { [Key: string]: any }) {
  try {
    const result = yield getMembersByUser(
      action.id,
      action.status,
      action.queryString,
      action.page,
      action.size
    );
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_MEMBERS_BY_USER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_MEMBERS_BY_USER_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetMembersByUser() {
  yield takeLatest(GET_MEMBERS_BY_USER_REQUEST, callGetMembersByUser);
}

function* callUpdateMember(action: { [Key: string]: any }) {
  try {
    const result = yield updateMember(action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: UPDATE_MEMBER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: UPDATE_MEMBER_FAILED, payload: err.response.data });
  }
}

export function* watchUpdateMember() {
  yield takeLatest(UPDATE_MEMBER_REQUEST, callUpdateMember);
}

function* callDeleteMember(action: { [Key: string]: any }) {
  try {
    const result = yield deleteMember(action.id);
    const { status, data } = result;
    if (status === 200 && data?.deleted) {
      yield put({ type: DELETE_MEMBER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: DELETE_MEMBER_FAILED, payload: err.response.data });
  }
}

export function* watchDeleteMember() {
  yield takeLatest(DELETE_MEMBER_REQUEST, callDeleteMember);
}
