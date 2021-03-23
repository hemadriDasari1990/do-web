import {
  ADD_OR_REMOVE_TEAM_MEMBER_FAILED,
  ADD_OR_REMOVE_TEAM_MEMBER_REQUEST,
  ADD_OR_REMOVE_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_FAILED,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  GET_TEAMS_FAILED,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAM_FAILED,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  UPDATE_TEAM_FAILED,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  SEND_INVITE_TO_TEAMS_FAILED,
  SEND_INVITE_TO_TEAMS_SUCCESS,
  SEND_INVITE_TO_TEAMS_REQUEST,
} from "../../actions/team/types";
import {
  addOrRemoveMemberFromTeam,
  deleteTeam,
  getTeamDetails,
  getTeams,
  updateTeam,
  sendInvitationToTeams,
} from "../../network/team";
import { put, takeLatest } from "redux-saga/effects";

function* callGetTeamDetails(action: { [Key: string]: any }) {
  try {
    const result = yield getTeamDetails(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_TEAM_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_TEAM_FAILED, payload: err.response.data });
  }
}

export function* watchGetTeamDetails() {
  yield takeLatest(GET_TEAM_REQUEST, callGetTeamDetails);
}

function* callGetTeams(action: { [Key: string]: any }) {
  try {
    const result = yield getTeams(action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: GET_TEAMS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: GET_TEAMS_FAILED, payload: err.response.data });
  }
}

export function* watchGetTeams() {
  yield takeLatest(GET_TEAMS_REQUEST, callGetTeams);
}

function* callUpdateTeam(action: { [Key: string]: any }) {
  try {
    const result = yield updateTeam(action.payload);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: UPDATE_TEAM_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: UPDATE_TEAM_FAILED, payload: err.response.data });
  }
}

export function* watchUpdateTeam() {
  yield takeLatest(UPDATE_TEAM_REQUEST, callUpdateTeam);
}

function* callDeleteTeam(action: { [Key: string]: any }) {
  try {
    const result = yield deleteTeam(action.id);
    const { status, data } = result;
    if (status === 200 && data?.deleted) {
      yield put({ type: DELETE_TEAM_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({ type: DELETE_TEAM_FAILED, payload: err.response.data });
  }
}

export function* watchDeleteTeam() {
  yield takeLatest(DELETE_TEAM_REQUEST, callDeleteTeam);
}

function* callAddOrRemoveMemberFromTeam(action: { [Key: string]: any }) {
  try {
    const result = yield addOrRemoveMemberFromTeam(action.payload, action.id);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: ADD_OR_REMOVE_TEAM_MEMBER_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: ADD_OR_REMOVE_TEAM_MEMBER_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchAddOrRemoveMemberFromTeam() {
  yield takeLatest(
    ADD_OR_REMOVE_TEAM_MEMBER_REQUEST,
    callAddOrRemoveMemberFromTeam
  );
}

function* callSendInvitationToTeams(action: { [Key: string]: any }) {
  try {
    const result = yield sendInvitationToTeams(action.payload);
    const { status, data } = result;
    if (status === 200) {
      yield put({ type: SEND_INVITE_TO_TEAMS_SUCCESS, payload: data });
    }
  } catch (err) {
    yield put({
      type: SEND_INVITE_TO_TEAMS_FAILED,
      payload: err.response.data,
    });
  }
}

export function* watchSendInvitationToTeams() {
  yield takeLatest(SEND_INVITE_TO_TEAMS_REQUEST, callSendInvitationToTeams);
}
