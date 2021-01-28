import {
    SHOW_CREATE_BOARD_BUTTON
} from "./types";

export const showCreateBoardButton = (flag: boolean) => {
    return {
        type: SHOW_CREATE_BOARD_BUTTON,
        showCreateBoardButton: flag
    }
}
