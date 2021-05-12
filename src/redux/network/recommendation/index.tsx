import {
  CREATE_RECOMMENDATION,
  GET_RECOMMENDATIONS,
} from "../../../network/endpoints";

import API from "../../../network";

export const getRecommendations = (
  rating: number,
  limit: number,
  isApproved: boolean
) => {
  const queryString = `?rating=${rating}&limit=${limit}&isApproved=${isApproved}`;
  return API(GET_RECOMMENDATIONS + queryString, { method: "GET" });
};

export const createRecommendation = (payload: { [Key: string]: any }) => {
  return API(CREATE_RECOMMENDATION, { method: "POST", data: payload });
};
