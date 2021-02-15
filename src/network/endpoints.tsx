/**
 * API Endoints
 */


 /* Login Endpoints */
 export const LOGIN = "/login";

  /* Organization Endpoints */
  export const CREATE_ORGANIZATION = "/organization";
  export const DELETE_ORGANIZATION = "/organization/{id}";
  export const GET_ORGANIZATION_DETAILS = "/organization/{id}"; 
  export const UPDATE_ORGANIZATION ="/organization";

/* Department Endpoints */
export const CREATE_DEPARTMENT = "/department";
export const DELETE_DEPARTMENT = "/department/{id}";
export const GET_DEPARTMENTS_BY_ORGANIZATION = "/department/{id}"; 
export const UPDATE_DEPARTMENT ="/department";
 
  /* Project Endpoints */
  export const CREATE_PROJECT = "/project";
  export const DELETE_PROJECT = "/project/{id}";
  export const GET_PROJECTS_BY_ORGANIZATION = "/project/{id}"; 
  export const UPDATE_PROJECT ="/project";

 /* Board Endpoints */
 export const DELETE_BOARD = "/board/{id}";
 export const GET_BOARD_DETAILS = "/board/{id}"; 
 export const UPDATE_BOARD ="/board";

 /* Section Endpoints */
 export const CREATE_SECTION = "/section";
 export const DELETE_SECTION = "/section/{id}";
 export const GET_SECTIONS_BY_BOARD = "/section/{id}"; 
 export const UPDATE_SECTION ="/section";

 /* Note Endpoints */
 export const DELETE_NOTE = "/note/{id}";
 export const GET_NOTES_BY_SECTION_DETAILS = "/note/{id}"; 
 export const UPDATE_NOTE ="/note";

/* Feedback Endpoints */
export const CREATE_FEEDBACK = "/feedback";
export const GET_FEEDBACKS = "/feedback";

/* Reaction Endpoints */
export const CREATE_OR_UPDATE_REACTION = "/react";