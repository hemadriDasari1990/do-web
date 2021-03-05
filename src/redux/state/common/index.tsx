import { useSelector } from "react-redux";

export function useShowCreateBoardButton() {
    return useSelector((state: {[Key: string]: any}) => ({
        showCreateBoardButton: state.common.showCreateBoardButton
    }))
}

export function useAuthenticated() {
    const { token } = useSelector((state: {[Key: string]: any}) => ({
        token: state.login.response?.token || sessionStorage.getItem("token")
    }));
    return !!token;
}
