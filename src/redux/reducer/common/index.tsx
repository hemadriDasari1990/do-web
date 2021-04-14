import { Action } from "redux";
import { STORE_ACTION } from "../../actions/common/types";

export interface ReduxAction extends Action {
  action: any;
  error: any;
}

const initialState = {
  action: "",
};

const common = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case STORE_ACTION:
      return {
        action: action.action,
      };
    default:
      return state;
  }
};

export default common;
