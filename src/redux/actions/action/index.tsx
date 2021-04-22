import { GET_ACTION_BY_BOARD_REQUEST } from "./types";

export const getActionByBoard = (boardId: string) => {
  return {
    type: GET_ACTION_BY_BOARD_REQUEST,
    id: boardId,
  };
};
