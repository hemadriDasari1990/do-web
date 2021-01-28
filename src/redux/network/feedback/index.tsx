import { CREATE_FEEDBACK, GET_FEEDBACKS } from "../../../network/endpoints";

import API from "../../../network";

export const getFeedbacks = () => {
    return API(GET_FEEDBACKS, { method: 'GET' });
}

export const createFeedback = (payload: {[Key: string]: any}) => {
    return API(CREATE_FEEDBACK, { method: 'POST', data: payload });
}