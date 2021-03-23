import {
  ADD_OR_REMOVE_TEAM_MEMBER,
  DELETE_TEAM,
  GET_TEAMS,
  GET_TEAM_DETAILS,
  UPDATE_TEAM,
  SEND_INVITE_TO_TEAMS,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getTeamDetails = (id: string) => {
  return API(replaceStr(GET_TEAM_DETAILS, "{id}", id), { method: "GET" });
};

export const getTeams = (userId: string) => {
  return API(replaceStr(GET_TEAMS, "{id}", userId), { method: "GET" });
};

export const updateTeam = (payload: { [Key: string]: any }) => {
  return API(UPDATE_TEAM, { method: "PUT", data: payload });
};

export const deleteTeam = (id: string) => {
  return API(replaceStr(DELETE_TEAM, "{id}", id), { method: "DELETE" });
};

export const addOrRemoveMemberFromTeam = (
  payload: { [Key: string]: any },
  id: string
) => {
  return API(replaceStr(ADD_OR_REMOVE_TEAM_MEMBER, "{id}", id), {
    method: "PUT",
    data: payload,
  });
};

export const sendInvitationToTeams = (payload: { [Key: string]: any }) => {
  return API(SEND_INVITE_TO_TEAMS, { method: "POST", data: payload });
};
