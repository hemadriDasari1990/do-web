import {
  DELETE_MEMBER_REQUEST,
  GET_MEMBERS_BY_USER_REQUEST,
  GET_MEMBER_REQUEST,
  UPDATE_MEMBER_REQUEST,
} from "./types";

export const getMemberDetails = (memberId: string) => {
  return {
    type: GET_MEMBER_REQUEST,
    id: memberId,
  };
};

export const getMembersByUser = (userId: string) => {
  return {
    type: GET_MEMBERS_BY_USER_REQUEST,
    id: userId,
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
