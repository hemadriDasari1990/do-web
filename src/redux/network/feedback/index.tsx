import { CREATE_FEEDBACK, GET_FEEDBACKS } from "../../../network/endpoints";

import API from "../../../network";

export const getFeedbacks = (flag: boolean, limit: number) => {
  const queryString = flag ? `?like=${flag}&limit=${limit}` : "";
  return API(GET_FEEDBACKS + queryString, { method: "GET" });
};

export const createFeedback = (payload: { [Key: string]: any }) => {
  return API(CREATE_FEEDBACK, { method: "POST", data: payload });
};
