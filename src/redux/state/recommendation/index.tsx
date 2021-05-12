import { useSelector } from "react-redux";

export function useRecommendation() {
  return useSelector((state: { [Key: string]: any }) => ({
    recommendation: state.recommendation.response,
  }));
}

export function useLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.recommendation?.loading,
  }));
}
