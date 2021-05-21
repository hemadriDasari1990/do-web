import { GET_DEFAULT_SECTIONS } from "../../../network/endpoints";

import API from "../../../network";

export const getDefaultSections = () => {
  return API(GET_DEFAULT_SECTIONS, {
    method: "GET",
  });
};
