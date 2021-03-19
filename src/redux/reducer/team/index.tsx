import {
  ADD_OR_REMOVE_TEAM_MEMBER_FAILED,
  ADD_OR_REMOVE_TEAM_MEMBER_REQUEST,
  ADD_OR_REMOVE_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_FAILED,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  GET_TEAMS_FAILED,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAM_FAILED,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  UPDATE_TEAM_FAILED,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
} from "../../actions/team/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  title: "",
  description: "",
  loading: false,
  response: null,
  teams: [],
};

const team = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case DELETE_TEAM_REQUEST:
      return {
        loading: true,
      };
    case DELETE_TEAM_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_TEAM_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_TEAM_REQUEST:
      return {
        loading: true,
      };
    case GET_TEAM_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_TEAM_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_TEAM_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_TEAM_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case ADD_OR_REMOVE_TEAM_MEMBER_REQUEST:
      return {
        loading: true,
      };
    case ADD_OR_REMOVE_TEAM_MEMBER_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case ADD_OR_REMOVE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case GET_TEAMS_REQUEST:
      return {
        loading: true,
      };
    case GET_TEAMS_FAILED:
      return {
        ...state,
        teams: action.payload,
        loading: false,
      };
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default team;
