import {
  CREATE_FEEDBACK_FAILED,
  CREATE_FEEDBACK_REQUEST,
  CREATE_FEEDBACK_SUCCESS,
  GET_FEEDBACKS_FAILED,
  GET_FEEDBACKS_REQUEST,
  GET_FEEDBACKS_SUCCESS,
} from "../../actions/feedback/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  about: "",
  comment: "",
  loading: false,
  like: false,
  response: null,
};

const feedback = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CREATE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FEEDBACK_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_FEEDBACKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FEEDBACKS_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_FEEDBACKS_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default feedback;
