import {
  CREATE_FEEDBACK_FAILED,
  CREATE_FEEDBACK_REQUEST,
  CREATE_FEEDBACK_SUCCESS,
  GET_FEEDBACKS_FAILED,
  GET_FEEDBACKS_REQUEST,
  GET_FEEDBACKS_SUCCESS,
} from "../../actions/feedback/types";
import { createFeedback, getFeedbacks } from "../../network/feedback";
import { put, takeLatest } from "redux-saga/effects";

function* callCreateFeedback(action: { [Key: string]: any }) {
  try {
    const result = yield createFeedback(action.payload);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: CREATE_FEEDBACK_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: CREATE_FEEDBACK_FAILED, payload: err.response?.data });
  }
}

export function* watchCreateFeedback() {
  yield takeLatest(CREATE_FEEDBACK_REQUEST, callCreateFeedback);
}

function* callGetFeedbacks(action: { [Key: string]: any }) {
  try {
    const result = yield getFeedbacks(
      action?.rating,
      action?.limit,
      action.isApproved
    );
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_FEEDBACKS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_FEEDBACKS_FAILED, payload: err.response?.data });
  }
}

export function* watchGetFeedbacks() {
  yield takeLatest(GET_FEEDBACKS_REQUEST, callGetFeedbacks);
}
