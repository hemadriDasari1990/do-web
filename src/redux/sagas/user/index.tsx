import {
  CREATE_USER_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_SUMMARY_FAILED,
  GET_ALL_SUMMARY_REQUEST,
  GET_ALL_SUMMARY_SUCCESS,
  GET_BOARDS_BY_USER_FAILED,
  GET_BOARDS_BY_USER_REQUEST,
  GET_BOARDS_BY_USER_SUCCESS,
  GET_USERS_FAILED,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_SUMMARY_FAILED,
  GET_USER_SUMMARY_REQUEST,
  GET_USER_SUMMARY_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../../actions/user/types";
import {
  createUser,
  deleteUser,
  getAllSummary,
  getBoardsByUser,
  getUserDetails,
  getUserSummary,
  getUsers,
  updateUser,
} from "../../network/user";
import { put, takeLatest } from "redux-saga/effects";

function* callGetUserDetails(action: { [Key: string]: any }) {
  try {
    const result = yield getUserDetails(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_USER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_USER_FAILED, payload: err.response.data });
  }
}

export function* watchGetUserDetails() {
  yield takeLatest(GET_USER_REQUEST, callGetUserDetails);
}

function* callGetBoardsByUser(action: { [Key: string]: any }) {
  try {
    const result = yield getBoardsByUser(action.id, action.limit);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_BOARDS_BY_USER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_BOARDS_BY_USER_FAILED, payload: err.response.data });
  }
}

export function* watchGetBoardsByUser() {
  yield takeLatest(GET_BOARDS_BY_USER_REQUEST, callGetBoardsByUser);
}

function* callGetUserSummary(action: { [Key: string]: any }) {
  try {
    const result = yield getUserSummary(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_USER_SUMMARY_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_USER_SUMMARY_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetUserSummary() {
  yield takeLatest(GET_USER_SUMMARY_REQUEST, callGetUserSummary);
}

function* callCreateUser(action: { [Key: string]: any }) {
  try {
    const result = yield createUser(action.payload);
    const { status, data } = result ? result : { status: null, data: null };
    if (status === 200 && !data?.errorId) {
      yield put({ type: CREATE_USER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: CREATE_USER_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchCreateUser() {
  yield takeLatest(CREATE_USER_REQUEST, callCreateUser);
}

function* callUpdateUser(action: { [Key: string]: any }) {
  try {
    const result = yield updateUser(action.id, action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: UPDATE_USER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: UPDATE_USER_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER_REQUEST, callUpdateUser);
}

function* callDeleteUser(action: { [Key: string]: any }) {
  try {
    const result = yield deleteUser(action.id);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: DELETE_USER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: DELETE_USER_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, callDeleteUser);
}

function* callGetAllSummary() {
  try {
    const result = yield getAllSummary();
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_ALL_SUMMARY_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_ALL_SUMMARY_FAILED, payload: err.response.data });
  }
}

export function* watchGetAllSummary() {
  yield takeLatest(GET_ALL_SUMMARY_REQUEST, callGetAllSummary);
}

function* callGetUsers() {
  try {
    const result = yield getUsers();
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_USERS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: GET_USERS_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetUsers() {
  yield takeLatest(GET_USERS_REQUEST, callGetUsers);
}
