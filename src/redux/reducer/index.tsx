import board from "./board";
import { combineReducers } from "redux";
import common from "./common";
import department from "./department";
import feedback from "./feedback";
import login from "./login";
import member from "./member";
import note from "./note";
import project from "./project";
import reaction from "./reaction";
import section from "./section";
import team from "./team";
import user from "./user";

const appReducer: any = combineReducers({
  board: board,
  section: section,
  note: note,
  feedback: feedback,
  common: common,
  reaction: reaction,
  user: user,
  project: project,
  login: login,
  department: department,
  team,
  member,
});

export default appReducer;
