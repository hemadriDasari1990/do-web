import { GET_JOINED_MEMBERS_REQUEST } from "./types";

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
