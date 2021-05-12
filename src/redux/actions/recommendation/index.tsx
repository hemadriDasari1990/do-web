import {
  CREATE_RECOMMENDATION_REQUEST,
  GET_RECOMMENDATIONS_REQUEST,
} from "./types";

export const getRecommendations = (
  limit: number,
  rating: number,
  isApproved?: boolean
) => {
  return {
    type: GET_RECOMMENDATIONS_REQUEST,
    url: `/recommendation`,
    rating,
    limit,
    isApproved,
  };
};

export const createRecommendation = (payload: { [Key: string]: any }) => {
  return {
    type: CREATE_RECOMMENDATION_REQUEST,
    url: `/recommendation`,
    payload: payload,
  };
};
