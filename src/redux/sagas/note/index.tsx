import {
  GET_NOTES_BY_SECTION_SUCCESS,
  GET_NOTES_BY_SECTION_REQUEST,
  GET_NOTES_BY_SECTION_FAILED,
} from "../../actions/note/types";
import { put, takeEvery } from "redux-saga/effects";

import { getNotesBySection } from "../../network/note";

function* callGetNotesBySection(action: { [Key: string]: any }) {
  try {
    const result = yield getNotesBySection(action.sectionId);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_NOTES_BY_SECTION_SUCCESS,
        payload: data,
        sectionKey: action.sectionKey,
      });
    }
  } catch (err) {
    yield put({
      type: GET_NOTES_BY_SECTION_FAILED,
      payload: err.response.data,
      sectionKey: action.sectionKey,
    });
  }
}

export function* watchGetNotesBySection() {
  yield takeEvery(GET_NOTES_BY_SECTION_REQUEST, callGetNotesBySection);
}
