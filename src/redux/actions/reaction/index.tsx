import {
  GET_REACTIONS_REQUEST,
  GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST,
  GET_REACTIONS_SUMMARY_BY_NOTE_REQUEST,
  GET_REACTIONS_SUMMARY_BY_SECTION_REQUEST,
} from "./types";

export const getReactionsSummaryByBoard = (boardId: string) => {
  return {
    type: GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST,
    id: boardId,
  };
};

export const getReactionsSummaryBySection = (sectionId: string) => {
  return {
    type: GET_REACTIONS_SUMMARY_BY_SECTION_REQUEST,
    id: sectionId,
  };
};

export const getReactionsSummaryByNote = (noteId: string) => {
  return {
    type: GET_REACTIONS_SUMMARY_BY_NOTE_REQUEST,
    id: noteId,
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
