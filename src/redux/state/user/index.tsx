import { useSelector } from "react-redux";

export function useUser() {
  return useSelector((state: { [Key: string]: any }) => ({
    user: state.user.response,
    name: state.user.response?.name,
    isStarted: state.user.response?.isStarted,
    description: state.user.response?.description,
    message: state.user.response?.message,
    totalTeams: state.user.response?.totalTeams,
    totalMembers: state.user.response?.totalMembers,
    totalProjects: state.user.response?.totalProjects,
    boards: state.user?.boards,
    userUpdated: state.user?.updated,
  }));
}

export function useUserLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.user?.loading,
  }));
}

export function useUserSummary() {
  return useSelector((state: { [Key: string]: any }) => ({
    summary: state.user.summary,
  }));
}

export function useAllSummary() {
  return useSelector((state: { [Key: string]: any }) => ({
    summary: state.user.summary,
  }));
}

export function useUsers() {
  return useSelector((state: { [Key: string]: any }) => ({
    users: state.user?.users,
  }));
}
