import {
    CREATE_OR_UPDATE_REACTION_REQUEST,
} from "./types";

export const createOrUpdateReaction = (payload: {[Key: string]: any}) => {
    return {
        type: CREATE_OR_UPDATE_REACTION_REQUEST,
        payload: payload
    }
}
