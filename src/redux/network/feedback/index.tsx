import { CREATE_FEEDBACK, GET_FEEDBACKS } from "../../../network/endpoints";

import API from "../../../network";

export const getFeedbacks = (flag: boolean) => {
  const queryString = flag ? `?like=${flag}` : "";
  return API(GET_FEEDBACKS + queryString, { method: "GET" });
};

export const createFeedback = (payload: { [Key: string]: any }) => {
  return API(CREATE_FEEDBACK, { method: "POST", data: payload });
};
