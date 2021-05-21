import { Action } from "redux";
import {
  STORE_ACTION,
  GET_DEFAULT_SECTIONS_FAILED,
  GET_DEFAULT_SECTIONS_REQUEST,
  GET_DEFAULT_SECTIONS_SUCCESS,
} from "../../actions/common/types";

export interface ReduxAction extends Action {
  action: any;
  error: any;
  data: any;
}

const initialState = {
  action: "",
  loading: false,
  defaultSections: [],
};

const common = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case STORE_ACTION:
      return {
        action: action.action,
      };
    case GET_DEFAULT_SECTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        defaultSections: [],
      };
    case GET_DEFAULT_SECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        defaultSections: action.data,
      };
    case GET_DEFAULT_SECTIONS_FAILED:
      return {
        ...state,
        loading: false,
        defaultSections: action.data,
      };
    default:
      return state;
  }
};

export default common;
