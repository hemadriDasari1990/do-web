import { useSelector } from "react-redux";

export function useActionItem() {
  return useSelector((state: { [Key: string]: any }) => ({
    actionItemList: state?.actionItem?.data,
  }));
}

export function useLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.actionItem?.loading,
  }));
}
