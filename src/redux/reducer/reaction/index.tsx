import {
  GET_REACTIONS_FAILED,
  GET_REACTIONS_REQUEST,
  GET_REACTIONS_SUCCESS,
  GET_REACTIONS_SUMMARY_BY_BOARD_FAILED,
  GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST,
  GET_REACTIONS_SUMMARY_BY_BOARD_SUCCESS,
  GET_REACTIONS_SUMMARY_BY_NOTE_FAILED,
  GET_REACTIONS_SUMMARY_BY_NOTE_REQUEST,
  GET_REACTIONS_SUMMARY_BY_NOTE_SUCCESS,
  GET_REACTIONS_SUMMARY_BY_SECTION_FAILED,
  GET_REACTIONS_SUMMARY_BY_SECTION_REQUEST,
  GET_REACTIONS_SUMMARY_BY_SECTION_SUCCESS,
} from "../../actions/reaction/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  loading: false,
  summary: null,
  data: [],
  totalReactons: 0,
};

const reaction = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_REACTIONS_SUMMARY_BY_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_REACTIONS_SUMMARY_BY_BOARD_FAILED:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_REACTIONS_SUMMARY_BY_BOARD_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_REACTIONS_SUMMARY_BY_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_REACTIONS_SUMMARY_BY_SECTION_FAILED:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_REACTIONS_SUMMARY_BY_SECTION_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_REACTIONS_SUMMARY_BY_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_REACTIONS_SUMMARY_BY_NOTE_FAILED:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_REACTIONS_SUMMARY_BY_NOTE_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_REACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_REACTIONS_FAILED:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_REACTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload?.data,
        totalReactions: action.payload?.total[0]?.count,
        loading: false,
      };
    default:
      return state;
  }
};

export default reaction;
