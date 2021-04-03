import {
  DELETE_BOARD,
  GET_BOARD_DETAILS,
  UPDATE_BOARD,
  GET_BOARDS,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getBoardDetails = (id: string) => {
  return API(replaceStr(GET_BOARD_DETAILS, "{id}", id), { method: "GET" });
};

export const updateBoard = (payload: { [Key: string]: any }) => {
  return API(UPDATE_BOARD, { method: "PUT", data: payload });
};

export const deleteBoard = (id: string) => {
  return API(replaceStr(DELETE_BOARD, "{id}", id), { method: "DELETE" });
};

export const getBoards = (
  id: string,
  accountType: string,
  queryString: string,
  page: number,
  size: number
) => {
  const url: string = `${GET_BOARDS}?id=${id}&accountType=${accountType}&queryString=${queryString}&page=${page}&size=${size}`;
  return API(url, { method: "GET" });
};
