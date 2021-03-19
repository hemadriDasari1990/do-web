import { useSelector } from "react-redux";

export function useMember() {
  return useSelector((state: { [Key: string]: any }) => ({
    member: state.member.response,
    members: state.member?.members,
    totalMembers: state.member.response?.totalMembers,
  }));
}

export function useMemberLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.member?.loading,
  }));
}
