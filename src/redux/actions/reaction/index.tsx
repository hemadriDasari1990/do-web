import {
  GET_REACTIONS_REQUEST,
  GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST,
} from "./types";

export const getReactionsSummaryByBoard = (boardId: string) => {
  return {
    type: GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST,
    id: boardId,
  };
};

export const getReactions = (noteId: string, page: number, size: number) => {
  return {
    type: GET_REACTIONS_REQUEST,
    noteId,
    page,
    size,
  };
};
