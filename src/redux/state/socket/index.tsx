import { useSelector } from "react-redux";

export function useSocket() {
  return useSelector((state: { [Key: string]: any }) => ({
    socket: state.socket.socket,
  }));
}
