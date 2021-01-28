import { useSelector } from "react-redux";

export function useShowCreateBoardButton() {
    return useSelector((state: {[Key: string]: any}) => ({
        showCreateBoardButton: state.common.showCreateBoardButton
    }))
}
