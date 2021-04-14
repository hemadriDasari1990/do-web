import {
  CREATE_SECURITY_QUESTION_ANSWER_REQUEST,
  GET_SECURITY_QUESTIONS_REQUEST,
  VERIFY_SECURITY_QUESTION_ANSWER_REQUEST,
} from "./types";

export const getSecurityQuestions = () => {
  return {
    type: GET_SECURITY_QUESTIONS_REQUEST,
  };
};

export const createSecurityQuestionAnswer = (payload: {
  [Key: string]: any;
}) => {
  return {
    type: CREATE_SECURITY_QUESTION_ANSWER_REQUEST,
    payload,
  };
};

export const verifySecurityQuestionAnswer = (payload: {
  [Key: string]: any;
}) => {
  return {
    type: VERIFY_SECURITY_QUESTION_ANSWER_REQUEST,
    payload,
  };
};
