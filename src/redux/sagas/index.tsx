import { watchCreateFeedback, watchGetFeedbacks } from "./feedback";
import {
  watchCreateOrganization,
  watchDeleteOrganization,
  watchGetAllSummary,
  watchGetOrganizationDetails,
  watchGetOrganizationSummary,
  watchGetOrganizations,
  watchUpdateOrganization,
} from "./organization";
import {
  watchDeleteBoard,
  watchGetBoardDetails,
  watchStartOrCompleteBoard,
  watchUpdateBoard,
} from "./board";
import {
  watchDeleteDepartment,
  watchGetDepartmentDetails,
  watchUpdateDepartment,
} from "./department";
import { watchDeleteNote, watchMarkAsRead, watchUpdateNote } from "./note";
import {
  watchDeleteProject,
  watchGetProjectDetails,
  watchUpdateProject,
} from "./project";
import {
  watchDeleteSection,
  watchGetSectionsByBoard,
  watchUpdateSection,
} from "./section";
import {
  watchForgotPassword,
  watchLogin,
  watchResendToken,
  watchResetPassword,
  watchValidateForgotPassword,
  watchVerifyToken,
} from "./login";

import { fork } from "redux-saga/effects";
import { watchreateOrUpdateReaction } from "./reaction";

function* rootSaga() {
  /* Login sagas */
  yield fork(watchLogin);
  yield fork(watchResendToken);
  yield fork(watchVerifyToken);
  yield fork(watchResetPassword);
  yield fork(watchValidateForgotPassword);
  yield fork(watchForgotPassword);

  /* Organization sagas */
  yield fork(watchCreateOrganization);
  yield fork(watchUpdateOrganization);
  yield fork(watchDeleteOrganization);
  yield fork(watchGetOrganizationDetails);
  yield fork(watchGetOrganizationSummary);
  yield fork(watchGetOrganizations);
  yield fork(watchGetAllSummary);

  /* Department sagas */
  yield fork(watchGetDepartmentDetails);
  yield fork(watchDeleteDepartment);
  yield fork(watchUpdateDepartment);

  /* Project sagas */
  yield fork(watchGetProjectDetails);
  yield fork(watchDeleteProject);
  yield fork(watchUpdateProject);

  /* Board sagas */
  yield fork(watchUpdateBoard);
  yield fork(watchDeleteBoard);
  yield fork(watchGetBoardDetails);
  yield fork(watchStartOrCompleteBoard);

  /* Section sagas */
  yield fork(watchGetSectionsByBoard);
  yield fork(watchDeleteSection);
  yield fork(watchUpdateSection);

  /* Note sagas */
  yield fork(watchDeleteNote);
  yield fork(watchUpdateNote);
  yield fork(watchMarkAsRead);

  /* Feedback sagas */
  yield fork(watchCreateFeedback);
  yield fork(watchGetFeedbacks);

  /* Reaction sagas */
  yield fork(watchreateOrUpdateReaction);
}

export default rootSaga;
