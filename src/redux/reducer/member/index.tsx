import {
  DELETE_MEMBER_FAILED,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  GET_MEMBERS_BY_USER_FAILED,
  GET_MEMBERS_BY_USER_REQUEST,
  GET_MEMBERS_BY_USER_SUCCESS,
  GET_MEMBER_FAILED,
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILED,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
} from "../../actions/member/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  name: "",
  email: "",
  loading: false,
  response: null,
  members: [],
};

const member = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case DELETE_MEMBER_REQUEST:
      return {
        loading: true,
      };
    case DELETE_MEMBER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_MEMBER_REQUEST:
      return {
        loading: true,
      };
    case GET_MEMBER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_MEMBER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_MEMBER_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_MEMBER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_MEMBERS_BY_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_MEMBERS_BY_USER_FAILED:
      return {
        ...state,
        members: action.payload,
        loading: false,
      };
    case GET_MEMBERS_BY_USER_SUCCESS:
      return {
        ...state,
        members: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default member;
