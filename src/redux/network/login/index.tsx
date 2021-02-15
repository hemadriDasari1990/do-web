import API from "../../../network";
import { LOGIN } from "../../../network/endpoints";

export const login = (payload: {[Key: string]: any}) => {
    return API(LOGIN, { method: 'POST', data: payload });
}