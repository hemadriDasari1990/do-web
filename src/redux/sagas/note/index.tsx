import {
  DELETE_NOTE_FAILED,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  MARK_AS_READ_FAILED,
  MARK_AS_READ_REQUEST,
  MARK_AS_READ_SUCCESS,
  UPDATE_NOTE_FAILED,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
} from "../../actions/note/types";
import { deleteNote, markAsRead, updateNote } from "../../network/note";
import { put, takeLatest } from "redux-saga/effects";

function* callUpdateNote(action: { [Key: string]: any }) {
  try {
    const result = yield updateNote(action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: UPDATE_NOTE_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: UPDATE_NOTE_FAILED, payload: err.response.data });
  }
}

export function* watchUpdateNote() {
  yield takeLatest(UPDATE_NOTE_REQUEST, callUpdateNote);
}

function* callDeleteNote(action: { [Key: string]: any }) {
  try {
    const result = yield deleteNote(action.id);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: DELETE_NOTE_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: DELETE_NOTE_FAILED, payload: err.response.data });
  }
}

export function* watchDeleteNote() {
  yield takeLatest(DELETE_NOTE_REQUEST, callDeleteNote);
}

function* callMarkAsRead(action: { [Key: string]: any }) {
  try {
    const result = yield markAsRead(action.id, action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: MARK_AS_READ_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: MARK_AS_READ_FAILED, payload: err.response.data });
  }
}

export function* watchMarkAsRead() {
  yield takeLatest(MARK_AS_READ_REQUEST, callMarkAsRead);
}
