import { STORE_SOCKET_INSTANCE } from "./types";

export const storeSocketInstance = (socket: any) => {
  return {
    type: STORE_SOCKET_INSTANCE,
    socket,
  };
};
