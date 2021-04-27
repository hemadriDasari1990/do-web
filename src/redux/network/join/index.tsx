import API from "../../../network";
import { GET_JOINED_MEMBERS } from "../../../network/endpoints";

export const getJoinedMembers = (
  boardId: string,
  queryString: string,
  page: number,
  size: number
) => {
  const url: string = `${GET_JOINED_MEMBERS}?boardId=${boardId}&queryString=${queryString}&page=${page}&size=${size}`;
  return API(url, { method: "GET" });
};
