import {
  CLEAR_JOIN_STATE,
  GET_JOINED_MEMBERS_REQUEST,
  JOIN_MEMBER_TO_BOARD_REQUEST,
} from "./types";

export const getJoinedMembers = (
  boardId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_JOINED_MEMBERS_REQUEST,
    id: boardId,
    queryString,
    page,
    size,
  };
};

export const joinMemberToBoard = (payload: { [Key: string]: any }) => {
  return {
    type: JOIN_MEMBER_TO_BOARD_REQUEST,
    payload: payload,
  };
};

export const clearJoinState = () => {
  return {
    type: CLEAR_JOIN_STATE,
  };
};
