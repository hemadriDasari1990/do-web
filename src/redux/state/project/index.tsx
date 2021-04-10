import { useSelector } from "react-redux";

export function useProject() {
  return useSelector((state: { [Key: string]: any }) => ({
    projects: state.project.data,
    totalProjects: state.project.totalProjects,
    project: state.project.response,
    user: state.project.response?.user,
  }));
}

export function useProjectLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.project?.loading,
  }));
}
