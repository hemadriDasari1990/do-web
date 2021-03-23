import {
  watchAddOrRemoveMemberFromTeam,
  watchDeleteTeam,
  watchGetTeamDetails,
  watchGetTeams,
  watchUpdateTeam,
  watchSendInvitationToTeams,
} from "./team";
import { watchCreateFeedback, watchGetFeedbacks } from "./feedback";
import {
  watchCreateUser,
  watchDeleteUser,
  watchGetAllSummary,
  watchGetUserDetails,
  watchGetUserSummary,
  watchGetUsers,
  watchUpdateUser,
} from "./user";
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
import {
  watchDeleteMember,
  watchGetMemberDetails,
  watchGetMembersByUser,
  watchUpdateMember,
} from "./member";
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
  watchLogout,
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
  yield fork(watchLogout);

  /* User sagas */
  yield fork(watchCreateUser);
  yield fork(watchUpdateUser);
  yield fork(watchDeleteUser);
  yield fork(watchGetUserDetails);
  yield fork(watchGetUserSummary);
  yield fork(watchGetUsers);
  yield fork(watchGetAllSummary);

  /* Department sagas */
  yield fork(watchGetDepartmentDetails);
  yield fork(watchDeleteDepartment);
  yield fork(watchUpdateDepartment);

  /* Project sagas */
  yield fork(watchGetProjectDetails);
  yield fork(watchDeleteProject);
  yield fork(watchUpdateProject);

  /* Team sagas */
  yield fork(watchGetTeamDetails);
  yield fork(watchDeleteTeam);
  yield fork(watchUpdateTeam);
  yield fork(watchAddOrRemoveMemberFromTeam);
  yield fork(watchGetTeams);
  yield fork(watchSendInvitationToTeams);

  /* Member sagas */
  yield fork(watchGetMemberDetails);
  yield fork(watchDeleteMember);
  yield fork(watchUpdateMember);
  yield fork(watchGetMembersByUser);

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
