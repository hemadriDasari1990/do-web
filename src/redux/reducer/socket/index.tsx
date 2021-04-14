import { Action } from "redux";
import { STORE_SOCKET_INSTANCE } from "../../actions/socket/types";

export interface ReduxAction extends Action {
  socket: any;
}

const initialState = {
  socket: null,
};

const socket = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case STORE_SOCKET_INSTANCE:
      return {
        socket: action.socket,
      };
    default:
      return state;
  }
};

export default socket;
