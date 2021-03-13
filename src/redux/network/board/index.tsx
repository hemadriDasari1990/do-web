import {
  DELETE_BOARD,
  GET_BOARD_DETAILS,
  START_OR_COMPLETE_BOARD,
  UPDATE_BOARD,
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

export const startOrCompleteBoard = (
  action: string,
  payload: { [Key: string]: any }
) => {
  return API(replaceStr(START_OR_COMPLETE_BOARD, "{action}", action), {
    method: "PUT",
    data: payload,
  });
};
