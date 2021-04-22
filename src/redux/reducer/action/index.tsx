import {
  GET_ACTION_BY_BOARD_FAILED,
  GET_ACTION_BY_BOARD_REQUEST,
  GET_ACTION_BY_BOARD_SUCCESS,
} from "../../actions/action/types";

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

const action = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_ACTION_BY_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTION_BY_BOARD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_ACTION_BY_BOARD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default action;
