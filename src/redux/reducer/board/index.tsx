import {
  CLEAR_BOARD,
  DELETE_BOARD_FAILED,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  GET_BOARDS_FAILED,
  GET_BOARDS_REQUEST,
  GET_BOARDS_SUCCESS,
  GET_BOARD_ACTIVITIES_FAILED,
  GET_BOARD_ACTIVITIES_REQUEST,
  GET_BOARD_ACTIVITIES_SUCCESS,
  GET_BOARD_FAILED,
  GET_BOARD_REQUEST,
  GET_BOARD_SUCCESS,
  STORE_MENU_ITEM,
  UPDATE_BOARD_FAILED,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
  CREATE_INSTANT_BOARD_FAILED,
  CREATE_INSTANT_BOARD_REQUEST,
  CREATE_INSTANT_BOARD_SUCCESS,
} from "../../actions/board/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  name: "",
  description: "",
  loading: false,
  updateLoading: false,
  noOfSections: 0,
  response: null,
  startedAt: null,
  completedAt: null,
  boards: [],
  totalBoards: 0,
  activities: [],
  totalActivities: 0,
};

const board = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case DELETE_BOARD_REQUEST:
      return {
        ...state,
      };
    case DELETE_BOARD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_BOARD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOARD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_BOARD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_BOARD_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };
    case UPDATE_BOARD_FAILED:
      return {
        ...state,
        response: action.payload,
        updateLoading: false,
      };
    case UPDATE_BOARD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        updateLoading: false,
      };
    case GET_BOARDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOARDS_FAILED:
      return {
        ...state,
        boards: action.payload,
        loading: false,
      };
    case GET_BOARDS_SUCCESS:
      return {
        ...state,
        boards: action.payload?.data,
        totalBoards: action.payload?.total[0]?.count,
        loading: false,
      };
    case GET_BOARD_ACTIVITIES_REQUEST:
      return {
        ...state,
      };
    case GET_BOARD_ACTIVITIES_FAILED:
      return {
        ...state,
        activities: action.payload,
        loading: false,
      };
    case GET_BOARD_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload?.data,
        totalActivities: action.payload?.total[0]?.count,
        loading: false,
      };
    case STORE_MENU_ITEM:
      return {
        ...state,
        itemName: action.payload,
      };
    case CLEAR_BOARD:
      return {
        ...state,
        response: null,
      };

    case CREATE_INSTANT_BOARD_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };
    case CREATE_INSTANT_BOARD_FAILED:
      return {
        ...state,
        response: action.payload,
        updateLoading: false,
      };
    case CREATE_INSTANT_BOARD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        updateLoading: false,
      };
    default:
      return state;
  }
};

export default board;
