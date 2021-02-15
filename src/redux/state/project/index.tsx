import { useSelector } from "react-redux";

export function useProject() {
    return useSelector((state: {[Key: string]: any}) => ({
        project: state.project.response,
        boards: state.project.response?.boards,
        totalBoards: state.project.response?.totalBoards,
    }))
}

export function useProjectLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.project?.loading
    }))
}