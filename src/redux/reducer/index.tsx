import board from "./board";
import { combineReducers } from "redux";
import common from "./common";
import feedback from "./feedback";
import login from "./login";
import member from "./member";
import project from "./project";
import reaction from "./reaction";
import section from "./section";
import securityQuestion from "./securityQuestion";
import socket from "./socket";
import team from "./team";
import user from "./user";

const appReducer: any = combineReducers({
  board: board,
  section: section,
  feedback: feedback,
  user: user,
  project: project,
  login: login,
  team,
  member,
  reaction,
  socket,
  securityQuestion,
  common,
});

export default appReducer;
