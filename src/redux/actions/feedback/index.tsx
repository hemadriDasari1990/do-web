import {
    CREATE_FEEDBACK_REQUEST,
    GET_FEEDBACKS_REQUEST
} from "./types";

export const getFeedbacks = () => {
    return {
        type: GET_FEEDBACKS_REQUEST,
        url: `/feedback`
    }
}

export const createFeedback = (payload: {[Key: string]: any}) => {
    return {
        type: CREATE_FEEDBACK_REQUEST,
        url: `/feedback`,
        payload: payload
    }
}
