import { useSelector } from "react-redux";

export function useSection() {
    return useSelector((state: {[Key: string]: any}) => ({
        section: state?.section.response
    }))
}

export function useLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.section?.loading
    }))
}