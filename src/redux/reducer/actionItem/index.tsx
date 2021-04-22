import {
  GET_ACTION_ITEMS_BY_ACTION_FAILED,
  GET_ACTION_ITEMS_BY_ACTION_REQUEST,
  GET_ACTION_ITEMS_BY_ACTION_SUCCESS,
} from "../../actions/actionItem/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  loading: false,
  response: null,
};

const actionItem = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_ACTION_ITEMS_BY_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTION_ITEMS_BY_ACTION_FAILED:
      return {
        ...state,
        data: action.payload || [],
        loading: false,
      };
    case GET_ACTION_ITEMS_BY_ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload || [],
        loading: false,
      };
    default:
      return state;
  }
};

export default actionItem;
