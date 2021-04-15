import { GET_NOTES_BY_SECTION } from "../../../network/endpoints";

import API from "../../../network";
import { replaceStr } from "../../../util";

export const getNotesBySection = (sectionId: string) => {
  return API(replaceStr(GET_NOTES_BY_SECTION, "{sectionId}", sectionId), {
    method: "GET",
  });
};
