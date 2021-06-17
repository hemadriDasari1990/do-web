import {
  GET_JOINED_MEMBERS,
  JOIN_MEMBER_TO_BOARD,
} from "../../../network/endpoints";

import API from "../../../network";

export const getJoinedMembers = (
  boardId: string,
  queryString: string,
  page: number,
  size: number
) => {
  const url: string = `${GET_JOINED_MEMBERS}?boardId=${boardId}&queryString=${queryString}&page=${page}&size=${size}`;
  return API(url, { method: "GET" });
};

export const joinMemberToBoard = (payload: { [Key: string]: any }) => {
  return API(JOIN_MEMBER_TO_BOARD, {
    method: "POST",
    data: payload,
  });
};
