import { STORE_ACTION } from "./types";
import { GET_DEFAULT_SECTIONS_REQUEST } from "./types";

export const storeAction = (action: string) => {
  return {
    type: STORE_ACTION,
    action,
  };
};

export const getDefaultSections = () => {
  return {
    type: GET_DEFAULT_SECTIONS_REQUEST,
  };
};
