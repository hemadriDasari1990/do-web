import {
  CLEAR_JOIN_STATE,
  GET_JOINED_MEMBERS_FAILED,
  GET_JOINED_MEMBERS_REQUEST,
  GET_JOINED_MEMBERS_SUCCESS,
  JOIN_MEMBER_TO_BOARD_FAILED,
  JOIN_MEMBER_TO_BOARD_REQUEST,
  JOIN_MEMBER_TO_BOARD_SUCCESS,
} from "../../actions/join/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  members: [],
  totalMembers: 0,
  response: null,
  loading: false,
};

const join = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_JOINED_MEMBERS_REQUEST:
      return {
        ...state,
      };
    case GET_JOINED_MEMBERS_FAILED:
      return {
        ...state,
        members: action.payload,
        loading: false,
      };
    case GET_JOINED_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload?.data,
        totalMembers: action.payload?.total[0]?.count,
        loading: false,
      };
    case JOIN_MEMBER_TO_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOIN_MEMBER_TO_BOARD_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case JOIN_MEMBER_TO_BOARD_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case CLEAR_JOIN_STATE:
      return initialState;

    default:
      return state;
  }
};

export default join;
