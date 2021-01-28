import {
    CREATE_FEEDBACK_FAILED,
    CREATE_FEEDBACK_INTERNAL_SERVER_ERROR,
    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    GET_FEEDBACKS_FAILED,
    GET_FEEDBACKS_INTERNAL_SERVER_ERROR,
    GET_FEEDBACKS_REQUEST,
    GET_FEEDBACKS_SUCCESS
} from "../../actions/feedback/types";
import { createFeedback, getFeedbacks } from "../../network/feedback";
import { put, takeLatest } from "redux-saga/effects";

function* callCreateFeedback(action: {[Key: string]: any}) {
    try {
        const result = yield createFeedback(action.payload);
        const { status, data } = result;
        if(status === 200 && data?._id){
            yield put({ type: CREATE_FEEDBACK_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: CREATE_FEEDBACK_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: CREATE_FEEDBACK_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: CREATE_FEEDBACK_FAILED, payload: err || err.message});
    }
}

export function* watchCreateFeedback(){
    yield takeLatest(CREATE_FEEDBACK_REQUEST, callCreateFeedback);
}

function* callGetFeedbacks() {
    try {
        const result = yield getFeedbacks();
        console.log("result", result)
        const { status, data } = result;
        if(status === 200){
            yield put({ type: GET_FEEDBACKS_SUCCESS, payload: data });
        }
        if(!result || !data){
            yield put({ type: GET_FEEDBACKS_FAILED, payload: data });
        }

        if(status === 500){
            yield put({ type: GET_FEEDBACKS_INTERNAL_SERVER_ERROR, payload: data });
        }
    } catch(err){
        yield put({ type: GET_FEEDBACKS_FAILED, payload: err || err.message});
    }
}

export function* watchGetFeedbacks(){
    yield takeLatest(GET_FEEDBACKS_REQUEST, callGetFeedbacks);
}

