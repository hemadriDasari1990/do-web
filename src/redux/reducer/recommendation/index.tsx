import {
  CREATE_RECOMMENDATION_FAILED,
  CREATE_RECOMMENDATION_REQUEST,
  CREATE_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATIONS_FAILED,
  GET_RECOMMENDATIONS_REQUEST,
  GET_RECOMMENDATIONS_SUCCESS,
} from "../../actions/recommendation/types";

import { Action } from "redux";

export interface ReduxAction extends Action {
  payload: any;
  error: any;
}

const initialState = {
  loading: false,
  desciption: "",
  rating: false,
  isApproved: false,
  response: null,
};

const recommendation = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CREATE_RECOMMENDATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_RECOMMENDATION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case CREATE_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_RECOMMENDATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_RECOMMENDATIONS_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GET_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        response: action.payload?.data,
        totalRecommendations: action.payload?.total[0]?.count,
        loading: false,
      };
    default:
      return state;
  }
};

export default recommendation;
