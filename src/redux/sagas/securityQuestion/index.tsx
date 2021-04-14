import {
  CREATE_SECURITY_QUESTION_ANSWER_FAILED,
  CREATE_SECURITY_QUESTION_ANSWER_REQUEST,
  CREATE_SECURITY_QUESTION_ANSWER_SUCCESS,
  GET_SECURITY_QUESTIONS_FAILED,
  GET_SECURITY_QUESTIONS_REQUEST,
  GET_SECURITY_QUESTIONS_SUCCESS,
  VERIFY_SECURITY_QUESTION_ANSWER_FAILED,
  VERIFY_SECURITY_QUESTION_ANSWER_REQUEST,
  VERIFY_SECURITY_QUESTION_ANSWER_SUCCESS,
} from "../../actions/securityQuestion/types";
import {
  createSecurityQuestionAnswer,
  getSecurityQuestions,
  verifySecurityQuestionAnswer,
} from "../../network/securityQuestion";
import { put, takeLatest } from "redux-saga/effects";

function* callGetSecurityQuestions() {
  try {
    const result = yield getSecurityQuestions();
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_SECURITY_QUESTIONS_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: GET_SECURITY_QUESTIONS_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchGetSecurityQuestions() {
  yield takeLatest(GET_SECURITY_QUESTIONS_REQUEST, callGetSecurityQuestions);
}

function* callCreateSecurityQuestionAnswer(action: { [Key: string]: any }) {
  try {
    const result = yield createSecurityQuestionAnswer(action.payload);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: CREATE_SECURITY_QUESTION_ANSWER_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: CREATE_SECURITY_QUESTION_ANSWER_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchCreateSecurityQuestionAnswer() {
  yield takeLatest(
    CREATE_SECURITY_QUESTION_ANSWER_REQUEST,
    callCreateSecurityQuestionAnswer
  );
}

function* callVerifySecurityQuestionAnswer(action: { [Key: string]: any }) {
  try {
    const result = yield verifySecurityQuestionAnswer(action.payload);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: VERIFY_SECURITY_QUESTION_ANSWER_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: VERIFY_SECURITY_QUESTION_ANSWER_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchVerifySecurityQuestionAnswer() {
  yield takeLatest(
    VERIFY_SECURITY_QUESTION_ANSWER_REQUEST,
    callVerifySecurityQuestionAnswer
  );
}
