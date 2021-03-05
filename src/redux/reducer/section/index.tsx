import {
  CREATE_SECTION_FAILED,
  CREATE_SECTION_REQUEST,
  CREATE_SECTION_SUCCESS,
  DELETE_SECTION_FAILED,
  DELETE_SECTION_REQUEST,
  DELETE_SECTION_SUCCESS,
  GET_SECTIONS_BY_BOARD_FAILED,
  GET_SECTIONS_BY_BOARD_REQUEST,
  GET_SECTIONS_BY_BOARD_SUCCESS,
  UPDATE_SECTION_FAILED,
  UPDATE_SECTION_REQUEST,
  UPDATE_SECTION_SUCCESS,
} from "../../actions/section/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  title: "",
  loading: false,
  response: null,
};

const section = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CREATE_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SECTION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case CREATE_SECTION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SECTION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_SECTION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_SECTIONS_BY_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SECTIONS_BY_BOARD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_SECTIONS_BY_BOARD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SECTION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_SECTION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default section;
