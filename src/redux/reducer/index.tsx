import board from "./board";
import { combineReducers } from "redux";
import common from "./common";
import feedback from "./feedback";
import note from "./note";
import reaction from "./reaction";
import section from "./section";

const appReducer: any = combineReducers({
    board: board,
    section: section,
    note: note,
    feedback: feedback,
    common: common,
    reaction: reaction
});

export default appReducer;