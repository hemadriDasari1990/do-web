import { useSelector } from "react-redux";

export function useFeedback() {
    return useSelector((state: {[Key: string]: any}) => ({
        feedback: state.feedback.response
    }))
}

export function useLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.feedback?.loading
    }))
}