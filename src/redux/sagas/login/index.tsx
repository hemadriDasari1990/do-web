import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESEND_TOKEN_FAILED,
  RESEND_TOKEN_REQUEST,
  RESEND_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILED,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
} from "../../actions/login/types";
import { login, resendToken, verifyToken } from "../../network/login";
import { put, takeLatest } from "redux-saga/effects";

function* callLogin(action: { [Key: string]: any }) {
  try {
    const result = yield login(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200 && data?.token) {
      sessionStorage.setItem("token", data?.token);
      sessionStorage.setItem("refreshToken", data?.refreshToken);
      yield put({ type: LOGIN_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: LOGIN_FAILED, payload: err.response.data });
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, callLogin);
}

function* callVerifyToken(action: { [Key: string]: any }) {
  try {
    const result = yield verifyToken(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200) {
      yield put({ type: VERIFY_TOKEN_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: VERIFY_TOKEN_FAILED, payload: err.response.data });
  }
}

export function* watchVerifyToken() {
  yield takeLatest(VERIFY_TOKEN_REQUEST, callVerifyToken);
}

function* callResendToken(action: { [Key: string]: any }) {
  try {
    const result = yield resendToken(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200) {
      yield put({ type: RESEND_TOKEN_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: RESEND_TOKEN_FAILED, payload: err.response.data });
  }
}

export function* watchResendToken() {
  yield takeLatest(RESEND_TOKEN_REQUEST, callResendToken);
}
