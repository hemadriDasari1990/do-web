import { useSelector } from "react-redux";

export function useReaction() {
    return useSelector((state: {[Key: string]: any}) => ({
        reaction: state.reaction.response
    }))
}

export function useReactionLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.feedback?.loading
    }))
}