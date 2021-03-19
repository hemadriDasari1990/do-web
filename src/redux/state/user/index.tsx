import { useSelector } from "react-redux";

export function useUser() {
  return useSelector((state: { [Key: string]: any }) => ({
    user: state.user.response,
    name: state.user.response?.name,
    description: state.user.response?.description,
    departments: state.user.response?.departments,
    totalDepartments: state.user.response?.totalDepartments,
    message: state.user.response?.message,
    teams: state.user.response?.teams,
    totalTeams: state.user.response?.totalTeams,
    members: state.user.response?.members,
    totalMembers: state.user.response?.totalMembers,
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
