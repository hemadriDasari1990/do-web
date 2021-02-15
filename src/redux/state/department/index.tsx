import { useSelector } from "react-redux";

export function useDepartment() {
    return useSelector((state: {[Key: string]: any}) => ({
        department: state.department.response,
        projects: state.department.response?.projects,
        totalProjects: state.department.response?.totalProjects,
    }))
}

export function useDepartmentLoading() {
    return useSelector((state: {[Key: string]: any}) => ({
        loading: state.department?.loading
    }))
}