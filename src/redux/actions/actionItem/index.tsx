import { GET_ACTION_ITEMS_BY_ACTION_REQUEST } from "./types";

export const getActionItemsByActionId = (actionId: string) => {
  return {
    type: GET_ACTION_ITEMS_BY_ACTION_REQUEST,
    actionId,
  };
};
