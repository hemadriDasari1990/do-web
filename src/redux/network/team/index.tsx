import {
  ADD_OR_REMOVE_TEAM_MEMBER,
  DELETE_TEAM,
  GET_TEAMS,
  GET_TEAM_DETAILS,
  SEND_INVITE_TO_TEAMS,
  UPDATE_TEAM,
  GET_TEAMS_BY_MEMBER,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getTeamDetails = (id: string) => {
  return API(replaceStr(GET_TEAM_DETAILS, "{id}", id), { method: "GET" });
};

export const getTeams = (
  userId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return API(
    GET_TEAMS +
      `?userId=${userId}&queryString=${queryString}&page=${page}&size=${size}`,
    {
      method: "GET",
    }
  );
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

export const getTeamsByMember = (
  id: string,
  queryString: string,
  page: number,
  size: number
) => {
  const url: string = `${replaceStr(
    GET_TEAMS_BY_MEMBER,
    "{memberId}",
    id
  )}?queryString=${queryString}&page=${page}&size=${size}`;
  return API(url, { method: "GET" });
};
