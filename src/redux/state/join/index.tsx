import { useSelector } from "react-redux";

export function useJoinedMembers() {
  return useSelector((state: { [Key: string]: any }) => ({
    members: state.join?.members,
    totalMembers: state.join?.totalMembers,
  }));
}
export function useJoinedMembersLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.join?.loading,
  }));
}
