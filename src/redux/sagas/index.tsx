import { watchCreateFeedback, watchGetFeedbacks } from "./feedback";
import { watchCreateOrganization, watchDeleteOrganization, watchGetOrganizationDetails, watchUpdateOrganization } from "./organization";
import { watchDeleteBoard, watchGetBoardDetails, watchUpdateBoard } from "./board";
import { watchDeleteDepartment, watchGetDepartmentsByOrganization, watchUpdateDepartment } from "./department";
import { watchDeleteNote, watchUpdateNote } from "./note";
import { watchDeleteProject, watchGetProjectsByOrganization, watchUpdateProject } from "./project";
import { watchDeleteSection, watchGetSectionsByBoard, watchUpdateSection } from "./section";

import { fork } from "redux-saga/effects";
import { watchLogin } from "./login";
import { watchreateOrUpdateReaction } from "./reaction";

function* rootSaga(){
    /* Organization sagas */
    yield fork(watchCreateOrganization);
    yield fork(watchUpdateOrganization);
    yield fork(watchDeleteOrganization);
    yield fork(watchGetOrganizationDetails);

    /* Department sagas */
    yield fork(watchGetDepartmentsByOrganization);
    yield fork(watchDeleteDepartment);
    yield fork(watchUpdateDepartment);

    /* Project sagas */
    yield fork(watchGetProjectsByOrganization);
    yield fork(watchDeleteProject);
    yield fork(watchUpdateProject);
    
    /* Board sagas */
    yield fork(watchUpdateBoard);
    yield fork(watchDeleteBoard);
    yield fork(watchGetBoardDetails);

    /* Section sagas */
    yield fork(watchGetSectionsByBoard);
    yield fork(watchDeleteSection);
    yield fork(watchUpdateSection);

    /* Note sagas */
    yield fork(watchDeleteNote);
    yield fork(watchUpdateNote);

    /* Feedback sagas */
    yield fork(watchCreateFeedback);
    yield fork(watchGetFeedbacks);

    /* Reaction sagas */
    yield fork(watchreateOrUpdateReaction);

    /* Login sagas */
    yield fork(watchLogin);
}

export default rootSaga;