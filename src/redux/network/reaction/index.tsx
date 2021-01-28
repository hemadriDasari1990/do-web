import API from "../../../network";
import { CREATE_OR_UPDATE_REACTION } from "../../../network/endpoints";

export const createOrUpdateReaction = (payload: {[Key: string]: any}) => {
    return API(CREATE_OR_UPDATE_REACTION, { method: 'PUT', data: payload });
}