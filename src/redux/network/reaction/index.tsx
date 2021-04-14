import {
  GET_REACTIONS,
  GET_REACTIONS_SUMMARY_BY_BOARD,
  GET_REACTIONS_SUMMARY_BY_NOTE,
  GET_REACTIONS_SUMMARY_BY_SECTION,
} from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getReactionsSummaryByBoard = (id: string) => {
  return API(replaceStr(GET_REACTIONS_SUMMARY_BY_BOARD, "{boardId}", id), {
    method: "GET",
  });
};

export const getReactionsSummaryBySection = (id: string) => {
  return API(replaceStr(GET_REACTIONS_SUMMARY_BY_SECTION, "{sectionId}", id), {
    method: "GET",
  });
};

export const getReactionsSummaryByNote = (id: string) => {
  return API(replaceStr(GET_REACTIONS_SUMMARY_BY_NOTE, "{noteId}", id), {
    method: "GET",
  });
};

export const getReactions = (noteId: string, page: number, size: number) => {
  return API(GET_REACTIONS + `?noteId=${noteId}&page=${page}&size=${size}`, {
    method: "GET",
  });
};
