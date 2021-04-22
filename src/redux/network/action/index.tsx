import { GET_ACTION_BY_BOARD } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getActionByBoard = (id: string) => {
  return API(replaceStr(GET_ACTION_BY_BOARD, "{id}", id), { method: "GET" });
};
