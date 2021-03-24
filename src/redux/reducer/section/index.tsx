import {
  GET_SECTIONS_BY_BOARD_FAILED,
  GET_SECTIONS_BY_BOARD_REQUEST,
  GET_SECTIONS_BY_BOARD_SUCCESS,
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
    default:
      return state;
  }
};

export default section;
