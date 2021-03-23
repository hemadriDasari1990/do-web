import {
  ADD_OR_REMOVE_TEAM_MEMBER_REQUEST,
  DELETE_TEAM_REQUEST,
  GET_TEAMS_REQUEST,
  GET_TEAM_REQUEST,
  UPDATE_TEAM_REQUEST,
  SEND_INVITE_TO_TEAMS_REQUEST,
} from "./types";

export const getTeamDetails = (teamId: string) => {
  return {
    type: GET_TEAM_REQUEST,
    id: teamId,
  };
};

export const getTeams = (userId: string) => {
  return {
    type: GET_TEAMS_REQUEST,
    id: userId,
  };
};

export const updateTeam = (payload: { [Key: string]: any }) => {
  return {
    type: UPDATE_TEAM_REQUEST,
    payload: payload,
  };
};

export const deleteTeam = (teamId: string) => {
  return {
    type: DELETE_TEAM_REQUEST,
    id: teamId,
  };
};

export const addOrRemoveMemberFromTeam = (
  payload: { [Key: string]: any },
  teamId: string
) => {
  return {
    type: ADD_OR_REMOVE_TEAM_MEMBER_REQUEST,
    payload: payload,
    id: teamId,
  };
};

export const sendInvitationToTeams = (payload: { [Key: string]: any }) => {
  return {
    type: SEND_INVITE_TO_TEAMS_REQUEST,
    payload: payload,
  };
};
