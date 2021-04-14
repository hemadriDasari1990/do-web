import { STORE_ACTION } from "./types";

export const storeAction = (action: string) => {
  return {
    type: STORE_ACTION,
    action,
  };
};
