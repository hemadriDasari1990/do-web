import {
  DELETE_DEPARTMENT_FAILED,
  DELETE_DEPARTMENT_REQUEST,
  DELETE_DEPARTMENT_SUCCESS,
  GET_DEPARTMENT_FAILED,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAILED,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_SUCCESS,
} from "../../actions/department/types";
import {
  deleteDepartment,
  getDepartmentDetails,
  updateDepartment,
} from "../../network/department";
import { put, takeLatest } from "redux-saga/effects";

function* callGetDepartmentsDetails(action: { [Key: string]: any }) {
  try {
    const result = yield getDepartmentDetails(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_DEPARTMENT_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_DEPARTMENT_FAILED, payload: err.response.data });
  }
}

export function* watchGetDepartmentDetails() {
  yield takeLatest(GET_DEPARTMENT_REQUEST, callGetDepartmentsDetails);
}

function* callUpdateDepartment(action: { [Key: string]: any }) {
  try {
    const result = yield updateDepartment(action.payload);
    const { status, data } = result;
    if (status === 200 && data?._id) {
      yield put({ type: UPDATE_DEPARTMENT_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: UPDATE_DEPARTMENT_FAILED, payload: err.response.data });
  }
}

export function* watchUpdateDepartment() {
  yield takeLatest(UPDATE_DEPARTMENT_REQUEST, callUpdateDepartment);
}

function* callDeleteDepartment(action: { [Key: string]: any }) {
  try {
    const result = yield deleteDepartment(action.id);
    const { status, data } = result;
    if (status === 200 && data?.deleted) {
      yield put({ type: DELETE_DEPARTMENT_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: DELETE_DEPARTMENT_FAILED, payload: err.response.data });
  }
}

export function* watchDeleteDepartment() {
  yield takeLatest(DELETE_DEPARTMENT_REQUEST, callDeleteDepartment);
}
