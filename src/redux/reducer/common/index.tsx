import { Action } from "redux";
import {
    SHOW_CREATE_BOARD_BUTTON
} from "../../actions/common/types";

export interface ReduxAction extends Action {
    payload: any;
    error: any;
    showCreateBoardButton: boolean;
}

const initialState = {
    showCreateBoardButton: false
}

const common = (state = initialState, action: ReduxAction) => {
    switch(action.type){
        case SHOW_CREATE_BOARD_BUTTON:
            return {
                ...state,
                showCreateBoardButton: action.showCreateBoardButton
            }
        default:
            return state;
    }
}

export default common;