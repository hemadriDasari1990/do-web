import {
  DELETE_BOARD_REQUEST,
  GET_BOARD_REQUEST,
  UPDATE_BOARD_REQUEST,
  GET_BOARDS_REQUEST,
} from "./types";

export const getBoardDetails = (boarId: string) => {
  return {
    type: GET_BOARD_REQUEST,
    id: boarId,
  };
};

export const getBoards = (
  id: string,
  accountType: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_BOARDS_REQUEST,
    id: id,
    queryString,
    page,
    size,
    accountType,
  };
};

export const updateBoard = (payload: { [Key: string]: any }) => {
  return {
    type: UPDATE_BOARD_REQUEST,
    url: `/board`,
    payload: payload,
  };
};

export const deleteBoard = (boarId: string) => {
  return {
    type: DELETE_BOARD_REQUEST,
    id: boarId,
  };
};
