import { useSelector } from "react-redux";

export function useAction() {
  return useSelector((state: { [Key: string]: any }) => ({
    action: state?.action.response,
  }));
}

export function useLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.action?.loading,
  }));
}
