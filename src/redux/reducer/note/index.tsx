import {
  GET_NOTES_BY_SECTION_FAILED,
  GET_NOTES_BY_SECTION_REQUEST,
  GET_NOTES_BY_SECTION_SUCCESS,
} from "../../actions/note/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
  sectionKey: string;
}

const initialState = {
  loading: false,
  response: null,
};

const note = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_NOTES_BY_SECTION_REQUEST:
      return {
        ...state,
        [action.sectionKey]: {
          loading: true,
        },
      };
    case GET_NOTES_BY_SECTION_FAILED:
      return {
        ...state,
        [action.sectionKey]: {
          data: action.payload || [],
          loading: false,
        },
      };
    case GET_NOTES_BY_SECTION_SUCCESS:
      return {
        ...state,
        [action.sectionKey]: {
          data: action.payload || [],
          loading: false,
        },
      };
    default:
      return state;
  }
};

export default note;
