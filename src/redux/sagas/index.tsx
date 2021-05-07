import {
  watchAddOrRemoveMemberFromTeam,
  watchDeleteTeam,
  watchGetTeamDetails,
  watchGetTeams,
  watchSendInvitationToTeams,
  watchUpdateTeam,
  watchGetTeamsByMember,
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
  watchUpdateAvatar,
  watchUpdateEmail,
  watchUpdateName,
  watchUpdatePassword,
} from "./user";
import {
  watchDeleteBoard,
  watchGetBoardActivities,
  watchGetBoardDetails,
  watchGetBoards,
  watchUpdateBoard,
} from "./board";
import {
  watchDeleteMember,
  watchGetMemberDetails,
  watchGetMembersByUser,
  watchUpdateMember,
  watchGetMembersByTeam,
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

import { fork } from "redux-saga/effects";
import { watchGetActionByBoard } from "./action";
import { watchGetActionItemsByAction } from "./actionItem";
import { watchGetInvitedMembers } from "./invite";
import { watchGetJoinedMembers } from "./join";
import { watchGetNotesBySection } from "./note";
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
  yield fork(watchUpdateEmail);
  yield fork(watchDeleteUser);
  yield fork(watchGetUserDetails);
  yield fork(watchGetUserSummary);
  yield fork(watchGetUsers);
  yield fork(watchGetAllSummary);
  yield fork(watchGetBoardsByUser);
  yield fork(watchUpdatePassword);
  yield fork(watchUpdateName);
  yield fork(watchUpdateAvatar);

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
  yield fork(watchGetTeamsByMember);

  /* Member sagas */
  yield fork(watchGetMemberDetails);
  yield fork(watchDeleteMember);
  yield fork(watchUpdateMember);
  yield fork(watchGetMembersByUser);
  yield fork(watchGetMembersByTeam);

  /* Board sagas */
  yield fork(watchUpdateBoard);
  yield fork(watchDeleteBoard);
  yield fork(watchGetBoardDetails);
  yield fork(watchGetBoards);
  yield fork(watchGetBoardActivities);

  /* Section sagas */
  yield fork(watchGetSectionsByBoard);

  /* Action sagas */
  yield fork(watchGetActionByBoard);

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

  /* Action item sagas */
  yield fork(watchGetActionItemsByAction);

  /* Inivte sagas */
  yield fork(watchGetInvitedMembers);

  /* Joined sagas */
  yield fork(watchGetJoinedMembers);
}

export default rootSaga;
