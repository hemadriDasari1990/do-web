import { GET_INVITED_MEMBERS_REQUEST } from "./types";

export const getInvitedMembers = (
  boardId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_INVITED_MEMBERS_REQUEST,
    id: boardId,
    queryString,
    page,
    size,
  };
};
