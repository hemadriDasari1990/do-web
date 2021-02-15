import board from "./board";
import { combineReducers } from "redux";
import common from "./common";
import department from "./department";
import feedback from "./feedback";
import login from "./login";
import note from "./note";
import organization from "./organization";
import project from "./project";
import reaction from "./reaction";
import section from "./section";

const appReducer: any = combineReducers({
    board: board,
    section: section,
    note: note,
    feedback: feedback,
    common: common,
    reaction: reaction,
    organization: organization,
    project: project,
    login: login,
    department: department
});

export default appReducer;