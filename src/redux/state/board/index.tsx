import { useSelector } from "react-redux";

export function useBoard() {
    return useSelector((state: {[Key: string]: any}) => ({
        board: state.board.response
    }))
}

export function useLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.board?.loading
    }))
}