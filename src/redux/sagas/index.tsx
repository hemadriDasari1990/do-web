import { watchCreateBoard, watchDeleteBoard, watchGetBoardDetails, watchUpdateBoard } from "./board";
import { watchCreateFeedback, watchGetFeedbacks } from "./feedback";
import { watchCreateNote, watchDeleteNote, watchUpdateNote } from "./note";
import { watchDeleteSection, watchGetSectionsByBoard, watchUpdateSection } from "./section";

import { fork } from "redux-saga/effects";
import { watchreateOrUpdateReaction } from "./reaction";

function* rootSaga(){
    /* Board sagas */
    yield fork(watchCreateBoard);
    yield fork(watchUpdateBoard);
    yield fork(watchDeleteBoard);
    yield fork(watchGetBoardDetails);

    /* Section sagas */
    yield fork(watchGetSectionsByBoard);
    yield fork(watchDeleteSection);
    yield fork(watchUpdateSection);

    /* Note sagas */
    yield fork(watchCreateNote);
    yield fork(watchDeleteNote);
    yield fork(watchUpdateNote);

    /* Feedback sagas */
    yield fork(watchCreateFeedback);
    yield fork(watchGetFeedbacks);

    /* Reaction sagas */
    yield fork(watchreateOrUpdateReaction);
}

export default rootSaga;