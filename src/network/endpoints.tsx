/**
 * API Endoints
 */

 /* Board Endpoints */
 export const CREATE_BOARD = "/board";
 export const DELETE_BOARD = "/board/{id}";
 export const GET_BOARD_DETAILS = "/board/{id}"; 
 export const UPDATE_BOARD ="/board/{id}";


 /* Section Endpoints */
 export const CREATE_SECTION = "/section";
 export const DELETE_SECTION = "/section/{id}";
 export const GET_SECTIONS_BY_BOARD = "/section/{id}"; 
 export const UPDATE_SECTION ="/section/{id}";


 /* Note Endpoints */
 export const CREATE_NOTE = "/note";
 export const DELETE_NOTE = "/note/{id}";
 export const GET_NOTES_BY_SECTION_DETAILS = "/note/{id}"; 
 export const UPDATE_NOTE ="/note";

/* Feedback Endpoints */
export const CREATE_FEEDBACK = "/feedback";
export const GET_FEEDBACKS = "/feedback";

/* Reaction Endpoints */
export const CREATE_OR_UPDATE_REACTION = "/react";