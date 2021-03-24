import board from "./board";
import { combineReducers } from "redux";
import department from "./department";
import feedback from "./feedback";
import login from "./login";
import member from "./member";
import project from "./project";
import section from "./section";
import team from "./team";
import user from "./user";

const appReducer: any = combineReducers({
  board: board,
  section: section,
  feedback: feedback,
  user: user,
  project: project,
  login: login,
  department: department,
  team,
  member,
});

export default appReducer;
