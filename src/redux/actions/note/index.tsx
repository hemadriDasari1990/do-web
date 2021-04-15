import { GET_NOTES_BY_SECTION_REQUEST } from "./types";

export const getNotesBySectionId = (sectionId: string, sectionKey: string) => {
  return {
    type: GET_NOTES_BY_SECTION_REQUEST,
    sectionId,
    sectionKey,
  };
};
