import {
  DELETE_MEMBER_REQUEST,
  GET_MEMBERS_BY_USER_REQUEST,
  GET_MEMBER_REQUEST,
  SEND_INVITATION_REQUEST,
  UPDATE_MEMBER_REQUEST,
  GET_MEMBERS_BY_TEAM_REQUEST,
} from "./types";

export const getMemberDetails = (memberId: string) => {
  return {
    type: GET_MEMBER_REQUEST,
    id: memberId,
  };
};

export const getMembersByUser = (
  userId: string,
  status: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_MEMBERS_BY_USER_REQUEST,
    id: userId,
    status,
    queryString,
    page,
    size,
  };
};

export const getMembersByTeam = (
  teamId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_MEMBERS_BY_TEAM_REQUEST,
    id: teamId,
    queryString,
    page,
    size,
  };
};

export const updateMember = (payload: { [Key: string]: any }) => {
  return {
    type: UPDATE_MEMBER_REQUEST,
    payload: payload,
  };
};

export const deleteMember = (memberId: string) => {
  return {
    type: DELETE_MEMBER_REQUEST,
    id: memberId,
  };
};

export const sendInvitations = (memberId: string) => {
  return {
    type: SEND_INVITATION_REQUEST,
    id: memberId,
  };
};
