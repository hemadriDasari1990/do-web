import {
  ADD_PROJECT_TO_STORE,
  DELETE_PROJECT_FAILED,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECTS_FAILED,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  UPDATE_PROJECT_FAILED,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "../../actions/project/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  title: "",
  description: "",
  loading: false,
  data: [],
  response: null,
  totalProjects: 0,
};

const project = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
      };
    case DELETE_PROJECT_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROJECTS_FAILED:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        data: action.payload?.data,
        totalProjects: action.payload?.total[0]?.count,
        loading: false,
      };
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
      };
    case UPDATE_PROJECT_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case ADD_PROJECT_TO_STORE:
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
};

export default project;
