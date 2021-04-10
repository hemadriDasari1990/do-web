import { useSelector } from "react-redux";

export function useReactionSummary() {
  return useSelector((state: { [Key: string]: any }) => ({
    summary: state.reaction?.summary,
  }));
}

export function useReactions() {
  return useSelector((state: { [Key: string]: any }) => ({
    reactions: state.reaction?.data,
    totalReactions: state.reaction?.totalReactions,
  }));
}
