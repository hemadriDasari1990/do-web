import { useSelector } from "react-redux";

export function useAuthenticated() {
  const { authenticated } = useSelector((state: { [Key: string]: any }) => ({
    authenticated: sessionStorage.getItem("token"),
  }));
  return !!authenticated;
}
