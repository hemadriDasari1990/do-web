import {
  CREATE_SECURITY_QUESTION_ANSWER_FAILED,
  CREATE_SECURITY_QUESTION_ANSWER_REQUEST,
  CREATE_SECURITY_QUESTION_ANSWER_SUCCESS,
  GET_SECURITY_QUESTIONS_FAILED,
  GET_SECURITY_QUESTIONS_REQUEST,
  GET_SECURITY_QUESTIONS_SUCCESS,
  VERIFY_SECURITY_QUESTION_ANSWER_FAILED,
  VERIFY_SECURITY_QUESTION_ANSWER_REQUEST,
  VERIFY_SECURITY_QUESTION_ANSWER_SUCCESS,
} from "../../actions/securityQuestion/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  loading: false,
  errorId: "",
  errorMessage: "",
  message: "",
};

const securitySection = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CREATE_SECURITY_QUESTION_ANSWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SECURITY_QUESTION_ANSWER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        errorId: "",
        errorMessage: "",
        loading: false,
      };
    case CREATE_SECURITY_QUESTION_ANSWER_FAILED:
      return {
        ...state,
        response: action.payload,
        message: "",
        loading: false,
      };
    case VERIFY_SECURITY_QUESTION_ANSWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_SECURITY_QUESTION_ANSWER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        errorId: "",
        errorMessage: "",
        loading: false,
      };
    case VERIFY_SECURITY_QUESTION_ANSWER_FAILED:
      return {
        ...state,
        response: action.payload,
        message: "",
        loading: false,
      };
    case GET_SECURITY_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SECURITY_QUESTIONS_FAILED:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case GET_SECURITY_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default securitySection;
