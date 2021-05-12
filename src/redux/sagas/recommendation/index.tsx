import {
  CREATE_RECOMMENDATION_FAILED,
  CREATE_RECOMMENDATION_REQUEST,
  CREATE_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATIONS_FAILED,
  GET_RECOMMENDATIONS_REQUEST,
  GET_RECOMMENDATIONS_SUCCESS,
} from "../../actions/recommendation/types";
import {
  createRecommendation,
  getRecommendations,
} from "../../network/recommendation";
import { put, takeLatest } from "redux-saga/effects";

function* callCreateRecommendation(action: { [Key: string]: any }) {
  try {
    const result = yield createRecommendation(action.payload);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: CREATE_RECOMMENDATION_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: CREATE_RECOMMENDATION_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchCreateRecommendation() {
  yield takeLatest(CREATE_RECOMMENDATION_REQUEST, callCreateRecommendation);
}

function* callGetRecommendations(action: { [Key: string]: any }) {
  try {
    const result = yield getRecommendations(
      action?.rating,
      action?.limit,
      action.isApproved
    );
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_RECOMMENDATIONS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_RECOMMENDATIONS_FAILED, payload: err.response.data });
  }
}

export function* watchGetRecommendations() {
  yield takeLatest(GET_RECOMMENDATIONS_REQUEST, callGetRecommendations);
}
