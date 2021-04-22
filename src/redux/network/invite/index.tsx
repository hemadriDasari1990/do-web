import API from "../../../network";
import { GET_INVITED_MEMBERS } from "../../../network/endpoints";

export const getInvitedMembers = (
  boardId: string,
  queryString: string,
  page: number,
  size: number
) => {
  const url: string = `${GET_INVITED_MEMBERS}?boardId=${boardId}&queryString=${queryString}&page=${page}&size=${size}`;
  return API(url, { method: "GET" });
};
