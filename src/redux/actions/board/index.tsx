import {
  DELETE_BOARD_REQUEST,
  GET_BOARDS_REQUEST,
  GET_BOARD_ACTIVITIES_REQUEST,
  GET_BOARD_REQUEST,
  STORE_MENU_ITEM,
  UPDATE_BOARD_REQUEST,
} from "./types";

export const getBoardDetails = (boarId: string) => {
  return {
    type: GET_BOARD_REQUEST,
    id: boarId,
  };
};

export const getBoards = (
  projectId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_BOARDS_REQUEST,
    id: projectId,
    queryString,
    page,
    size,
  };
};

export const getActivities = (
  boardId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_BOARD_ACTIVITIES_REQUEST,
    id: boardId,
    queryString,
    page,
    size,
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

export const storeMenuItem = (itemName: string) => {
  return {
    type: STORE_MENU_ITEM,
    payload: itemName,
  };
};
