import {
  GET_REACTIONS_FAILED,
  GET_REACTIONS_REQUEST,
  GET_REACTIONS_SUCCESS,
  GET_REACTIONS_SUMMARY_BY_BOARD_FAILED,
  GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST,
  GET_REACTIONS_SUMMARY_BY_BOARD_SUCCESS,
  GET_REACTIONS_SUMMARY_BY_NOTE_FAILED,
  GET_REACTIONS_SUMMARY_BY_NOTE_REQUEST,
  GET_REACTIONS_SUMMARY_BY_NOTE_SUCCESS,
  GET_REACTIONS_SUMMARY_BY_SECTION_FAILED,
  GET_REACTIONS_SUMMARY_BY_SECTION_REQUEST,
  GET_REACTIONS_SUMMARY_BY_SECTION_SUCCESS,
} from "../../actions/reaction/types";
import {
  getReactions,
  getReactionsSummaryByBoard,
  getReactionsSummaryByNote,
  getReactionsSummaryBySection,
} from "../../network/reaction";
import { put, takeLatest } from "redux-saga/effects";

function* callGetReactionsSummaryByBoard(action: { [Key: string]: any }) {
  try {
    const result = yield getReactionsSummaryByBoard(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_REACTIONS_SUMMARY_BY_BOARD_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: GET_REACTIONS_SUMMARY_BY_BOARD_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchGetReactionsSummaryByBoard() {
  yield takeLatest(
    GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST,
    callGetReactionsSummaryByBoard
  );
}

function* callGetReactionsSummaryBySection(action: { [Key: string]: any }) {
  try {
    const result = yield getReactionsSummaryBySection(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_REACTIONS_SUMMARY_BY_SECTION_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: GET_REACTIONS_SUMMARY_BY_SECTION_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchGetReactionsSummaryBySection() {
  yield takeLatest(
    GET_REACTIONS_SUMMARY_BY_SECTION_REQUEST,
    callGetReactionsSummaryBySection
  );
}

function* callGetReactionsSummaryByNote(action: { [Key: string]: any }) {
  try {
    const result = yield getReactionsSummaryByNote(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_REACTIONS_SUMMARY_BY_NOTE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: GET_REACTIONS_SUMMARY_BY_NOTE_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchGetReactionsSummaryByNote() {
  yield takeLatest(
    GET_REACTIONS_SUMMARY_BY_NOTE_REQUEST,
    callGetReactionsSummaryByNote
  );
}

function* callGetReactions(action: { [Key: string]: any }) {
  try {
    const result = yield getReactions(action.noteId, action.page, action.size);
    const { status, data } = result;
    if (status === 200) {
      yield put({
        type: GET_REACTIONS_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    yield put({
      type: GET_REACTIONS_FAILED,
      payload: err.response?.data,
    });
  }
}

export function* watchGetReactions() {
  yield takeLatest(GET_REACTIONS_REQUEST, callGetReactions);
}
