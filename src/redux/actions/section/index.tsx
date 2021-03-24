import { GET_SECTIONS_BY_BOARD_REQUEST } from "./types";

export const getSectionsByBoard = (boardId: string) => {
  return {
    type: GET_SECTIONS_BY_BOARD_REQUEST,
    id: boardId,
  };
};
