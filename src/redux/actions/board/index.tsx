import {
  DELETE_BOARD_REQUEST,
  GET_BOARD_REQUEST,
  START_OR_COMPLETE_BOARD_REQUEST,
  UPDATE_BOARD_REQUEST,
} from "./types";

export const getBoardDetails = (boarId: string) => {
  return {
    type: GET_BOARD_REQUEST,
    id: boarId,
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

export const startOrCompleteBoard = (
  action: string,
  payload: { [Key: string]: any }
) => {
  return {
    type: START_OR_COMPLETE_BOARD_REQUEST,
    payload: payload,
    action,
  };
};
