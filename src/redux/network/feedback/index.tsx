import { CREATE_FEEDBACK, GET_FEEDBACKS } from "../../../network/endpoints";

import API from "../../../network";

export const getFeedbacks = (
  rating: number,
  limit: number,
  isApproved: boolean
) => {
  const queryString = `?rating=${rating}&limit=${limit}&isApproved=${isApproved}`;
  return API(GET_FEEDBACKS + queryString, { method: "GET" });
};

export const createFeedback = (payload: { [Key: string]: any }) => {
  return API(CREATE_FEEDBACK, { method: "POST", data: payload });
};
