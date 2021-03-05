import {
  CREATE_OR_UPDATE_REACTION_FAILED,
  CREATE_OR_UPDATE_REACTION_REQUEST,
  CREATE_OR_UPDATE_REACTION_SUCCESS,
} from "../../actions/reaction/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  notedId: "",
  type: "",
  loading: false,
  response: null,
};

const reaction = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CREATE_OR_UPDATE_REACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_OR_UPDATE_REACTION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case CREATE_OR_UPDATE_REACTION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reaction;
