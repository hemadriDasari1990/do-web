import { useSelector } from "react-redux";

export function useAuthenticated() {
  const { authenticated } = useSelector((state: { [Key: string]: any }) => ({
    authenticated: localStorage.getItem("token"),
  }));
  return !!authenticated;
}

export function useAction() {
  const { action } = useSelector((state: { [Key: string]: any }) => ({
    action: state.common.action,
  }));
  return {
    action,
  };
}
