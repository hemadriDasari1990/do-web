import {
    LOGIN_REQUEST
} from "./types";

export const login = (payload: {[Key: string]: any}) => {
    return {
        type: LOGIN_REQUEST,
        url: `/organization`,
        payload: payload
    }
}
