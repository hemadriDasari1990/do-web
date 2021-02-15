import { useSelector } from "react-redux";

export function useShowCreateBoardButton() {
    return useSelector((state: {[Key: string]: any}) => ({
        showCreateBoardButton: state.common.showCreateBoardButton
    }))
}

export function useAuthenticated() {
    const token = sessionStorage.getItem("token");
    return !!token;
}
