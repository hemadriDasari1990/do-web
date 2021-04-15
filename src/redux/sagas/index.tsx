import {
  watchAddOrRemoveMemberFromTeam,
  watchDeleteTeam,
  watchGetTeamDetails,
  watchGetTeams,
  watchSendInvitationToTeams,
  watchUpdateTeam,
} from "./team";
import { watchCreateFeedback, watchGetFeedbacks } from "./feedback";
import {
  watchCreateSecurityQuestionAnswer,
  watchGetSecurityQuestions,
  watchVerifySecurityQuestionAnswer,
} from "./securityQuestion";
import {
  watchCreateUser,
  watchDeleteUser,
  watchGetAllSummary,
  watchGetBoardsByUser,
  watchGetUserDetails,
  watchGetUserSummary,
  watchGetUsers,
  watchUpdatePassword,
  watchUpdateUser,
} from "./user";
import {
  watchDeleteBoard,
  watchGetBoardDetails,
  watchGetBoards,
  watchUpdateBoard,
} from "./board";
import {
  watchDeleteMember,
  watchGetMemberDetails,
  watchGetMembersByUser,
  watchUpdateMember,
} from "./member";
import {
  watchDeleteProject,
  watchGetProjects,
  watchUpdateProject,
} from "./project";
import {
  watchForgotPassword,
  watchLogin,
  watchLogout,
  watchResendToken,
  watchResetPassword,
  watchValidateForgotPassword,
  watchVerifyToken,
} from "./login";
import {
  watchGetReactions,
  watchGetReactionsSummaryByBoard,
  watchGetReactionsSummaryByNote,
  watchGetReactionsSummaryBySection,
} from "./reaction";

import { watchGetNotesBySection } from "./note";

import { fork } from "redux-saga/effects";
import { watchGetSectionsByBoard } from "./section";

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
  yield fork(watchGetBoardsByUser);
  yield fork(watchUpdatePassword);

  /* Project sagas */
  yield fork(watchGetProjects);
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
  yield fork(watchGetBoards);

  /* Section sagas */
  yield fork(watchGetSectionsByBoard);

  /* Reaction sagas */
  yield fork(watchGetReactionsSummaryByBoard);
  yield fork(watchGetReactions);
  yield fork(watchGetReactionsSummaryBySection);
  yield fork(watchGetReactionsSummaryByNote);

  /* Feedback sagas */
  yield fork(watchCreateFeedback);
  yield fork(watchGetFeedbacks);

  /* Security Question sagas */
  yield fork(watchCreateSecurityQuestionAnswer);
  yield fork(watchGetSecurityQuestions);
  yield fork(watchVerifySecurityQuestionAnswer);

  /* Notes sagas */
  yield fork(watchGetNotesBySection);
}

export default rootSaga;
