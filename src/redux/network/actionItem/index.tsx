import { GET_ACTION_ITEMS_BY_ACTION } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getActionItemsByAction = (actionId: string) => {
  return API(replaceStr(GET_ACTION_ITEMS_BY_ACTION, "{actionId}", actionId), {
    method: "GET",
  });
};
