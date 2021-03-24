import { GET_SECTIONS_BY_BOARD } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getSectionsByBoard = (id: string) => {
  return API(replaceStr(GET_SECTIONS_BY_BOARD, "{id}", id), { method: "GET" });
};
