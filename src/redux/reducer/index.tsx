import board from "./board";
import { combineReducers } from "redux";
import feedback from "./feedback";
import login from "./login";
import member from "./member";
import project from "./project";
import reaction from "./reaction";
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
  team,
  member,
  reaction,
});

export default appReducer;
