import {
  CREATE_USER_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_SUMMARY_FAILED,
  GET_ALL_SUMMARY_REQUEST,
  GET_ALL_SUMMARY_SUCCESS,
  GET_BOARDS_BY_USER_FAILED,
  GET_BOARDS_BY_USER_REQUEST,
  GET_BOARDS_BY_USER_SUCCESS,
  GET_USERS_FAILED,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_SUMMARY_FAILED,
  GET_USER_SUMMARY_REQUEST,
  GET_USER_SUMMARY_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../../actions/user/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  name: "",
  uniqueKey: "",
  loading: false,
  response: null,
  boards: [],
};

const user = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_USER_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUMMARY_FAILED:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_USER_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };

    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case GET_ALL_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_SUMMARY_FAILED:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_ALL_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_BOARDS_BY_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOARDS_BY_USER_FAILED:
      return {
        ...state,
        boards: action.payload,
        loading: false,
      };
    case GET_BOARDS_BY_USER_SUCCESS:
      return {
        ...state,
        boards: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
