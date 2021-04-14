import {
  CREATE_SECURITY_QUESTION_ANSWER,
  GET_SECURITY_QUESTIONS,
  VERIFY_SECURITY_QUESTION_ANSWER,
} from "../../../network/endpoints";

import API from "../../../network";

export const getSecurityQuestions = () => {
  return API(GET_SECURITY_QUESTIONS, {
    method: "GET",
  });
};

export const createSecurityQuestionAnswer = (payload: {
  [Key: string]: any;
}) => {
  return API(CREATE_SECURITY_QUESTION_ANSWER, {
    method: "POST",
    data: payload,
  });
};

export const verifySecurityQuestionAnswer = (payload: {
  [Key: string]: any;
}) => {
  return API(VERIFY_SECURITY_QUESTION_ANSWER, {
    method: "POST",
    data: payload,
  });
};
