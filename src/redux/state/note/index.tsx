import { useSelector } from "react-redux";

export function useNote() {
    return useSelector((state: {[Key: string]: any}) => ({
        note: state.note.response
    }))
}

export function useLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.note?.loading
    }))
}