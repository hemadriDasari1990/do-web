import {
  CREATE_OR_UPDATE_REACTION_FAILED,
  CREATE_OR_UPDATE_REACTION_REQUEST,
  CREATE_OR_UPDATE_REACTION_SUCCESS,
} from "../../actions/reaction/types";
import { put, takeLatest } from "redux-saga/effects";

import { createOrUpdateReaction } from "../../network/reaction";

function* callCreateOrUpdateReaction(action: { [Key: string]: any }) {
  try {
    const result = yield createOrUpdateReaction(action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: CREATE_OR_UPDATE_REACTION_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: CREATE_OR_UPDATE_REACTION_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchreateOrUpdateReaction() {
  yield takeLatest(
    CREATE_OR_UPDATE_REACTION_REQUEST,
    callCreateOrUpdateReaction
  );
}
