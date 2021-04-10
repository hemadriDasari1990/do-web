import {
  GET_REACTIONS,
  GET_REACTIONS_SUMMARY_BY_BOARD,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getReactionsSummaryByBoard = (id: string): Generator<any> => {
  return API(replaceStr(GET_REACTIONS_SUMMARY_BY_BOARD, "{boardId}", id), {
    method: "GET",
  });
};

export const getReactions = (noteId: string, page: number, size: number) => {
  return API(GET_REACTIONS + `?noteId=${noteId}&page=${page}&size=${size}`, {
    method: "GET",
  });
};
