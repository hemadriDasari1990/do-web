import {
  CREATE_ORGANIZATION_FAILED,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_FAILED,
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  GET_ALL_SUMMARY_FAILED,
  GET_ALL_SUMMARY_REQUEST,
  GET_ALL_SUMMARY_SUCCESS,
  GET_ORGANIZATIONS_FAILED,
  GET_ORGANIZATIONS_REQUEST,
  GET_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATION_FAILED,
  GET_ORGANIZATION_REQUEST,
  GET_ORGANIZATION_SUCCESS,
  GET_ORGANIZATION_SUMMARY_FAILED,
  GET_ORGANIZATION_SUMMARY_REQUEST,
  GET_ORGANIZATION_SUMMARY_SUCCESS,
  UPDATE_ORGANIZATION_FAILED,
  UPDATE_ORGANIZATION_REQUEST,
  UPDATE_ORGANIZATION_SUCCESS,
} from "../../actions/organization/types";

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
};

const organization = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CREATE_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORGANIZATION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ORGANIZATION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case DELETE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORGANIZATION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_ORGANIZATION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORGANIZATION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_ORGANIZATION_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORGANIZATION_SUMMARY_FAILED:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case GET_ORGANIZATION_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };

    case GET_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORGANIZATIONS_FAILED:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case GET_ORGANIZATIONS_SUCCESS:
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
    default:
      return state;
  }
};

export default organization;
