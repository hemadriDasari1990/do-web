import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESEND_ACTIVATION_LINK_FAILED,
  RESEND_ACTIVATION_LINK_REQUEST,
  RESEND_ACTIVATION_LINK_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  VALIDATE_FORGOT_PASSWORD_FAILED,
  VALIDATE_FORGOT_PASSWORD_REQUEST,
  VALIDATE_FORGOT_PASSWORD_SUCCESS,
  VERIFY_TOKEN_FAILED,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
} from "../../actions/login/types";
import { call, put, takeLatest } from "redux-saga/effects";
import { changeViewport, delay } from "../../../util";
import {
  forgotPassword,
  login,
  logout,
  resendActivationLink,
  resetPassword,
  validateForgotPassword,
  verifyToken,
} from "../../network/login";

function* callLogin(action: { [Key: string]: any }) {
  try {
    const result = yield login(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200 && data?.token) {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("refreshToken", data?.refreshToken);
      yield call(delay, 2000);
      yield put({ type: LOGIN_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: LOGIN_FAILED, payload: err.response?.data });
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, callLogin);
}

function* callLogout() {
  try {
    const result = yield logout();
    const status = result?.status;
    const data = result?.data;
    if (status === 200) {
      changeViewport("width=device-width, initial-scale=1.0");
      localStorage.clear();
      yield put({ type: LOGOUT_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: LOGOUT_FAILED, payload: err.response?.data });
  }
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, callLogout);
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
    yield put({ type: VERIFY_TOKEN_FAILED, payload: err.response?.data });
  }
}

export function* watchVerifyToken() {
  yield takeLatest(VERIFY_TOKEN_REQUEST, callVerifyToken);
}

function* callForgotPassword(action: { [Key: string]: any }) {
  try {
    const result = yield forgotPassword(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200) {
      yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: FORGOT_PASSWORD_FAILED, payload: err.response?.data });
  }
}

export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, callForgotPassword);
}

function* callValidateForgotPassword(action: { [Key: string]: any }) {
  try {
    const result = yield validateForgotPassword(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200) {
      yield put({ type: VALIDATE_FORGOT_PASSWORD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: VALIDATE_FORGOT_PASSWORD_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchValidateForgotPassword() {
  yield takeLatest(
    VALIDATE_FORGOT_PASSWORD_REQUEST,
    callValidateForgotPassword
  );
}

function* callResetPassword(action: { [Key: string]: any }) {
  try {
    const result = yield resetPassword(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200) {
      yield put({ type: RESET_PASSWORD_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: RESET_PASSWORD_FAILED, payload: err.response?.data });
  }
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUEST, callResetPassword);
}

function* callResendActivationLink(action: { [Key: string]: any }) {
  try {
    const result = yield resendActivationLink(action.payload);
    const status = result?.status;
    const data = result?.data;
    if (status === 200) {
      yield put({ type: RESEND_ACTIVATION_LINK_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: RESEND_ACTIVATION_LINK_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchResendActivationLink() {
  yield takeLatest(RESEND_ACTIVATION_LINK_REQUEST, callResendActivationLink);
}
