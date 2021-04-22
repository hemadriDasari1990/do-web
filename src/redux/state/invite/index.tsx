import { useSelector } from "react-redux";

export function useInvitedMembers() {
  return useSelector((state: { [Key: string]: any }) => ({
    members: state.invite?.members,
    totalMembers: state.invite?.totalMembers,
  }));
}
