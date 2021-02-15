import { parseJwt } from "../../../util";
import { useSelector } from "react-redux";

export function useLogin() {
    const {
        token,
        success,
        message
    } = useSelector((state: {[Key: string]: any}) => ({
        token: state.login.response?.token ? state.login.response?.token: sessionStorage.getItem("token"),
        success: state.login.response?.success,
        message: state.login.response?.message,
    }))
    const descodedData: {[Key: string]: any} = parseJwt(token);
    return {
        token,
        success,
        organizationId: descodedData?._id,
        message
    }
}

export function useLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.login?.loading
    }))
}