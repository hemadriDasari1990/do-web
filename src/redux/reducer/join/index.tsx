import {
  GET_JOINED_MEMBERS_FAILED,
  GET_JOINED_MEMBERS_REQUEST,
  GET_JOINED_MEMBERS_SUCCESS,
} from "../../actions/join/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  members: [],
  totalMembers: 0,
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
        activities: action.payload,
        loading: false,
      };
    case GET_JOINED_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload?.data,
        totalMembers: action.payload?.total[0]?.count,
        loading: false,
      };
    default:
      return state;
  }
};

export default join;
