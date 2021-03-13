/**
 * API Endoints
 */

/* Login Endpoints */
export const LOGIN = "/auth/login";
export const REFRESH_TOKEN = "/auth/refresh-token";
export const VERIFY_TOKEN = "/auth/verify-token";
export const RESEND_TOKEN = "/auth/resend-token";
export const FORGOT_PASSWORD = "/auth/forgot-password";
export const VALIDATE_FORGOT_PASSWORD = "/auth/validate-forgot-password";
export const RESET_PASSWORD = "/auth/reset-password";

/* Organization Endpoints */
export const CREATE_ORGANIZATION = "/organization";
export const DELETE_ORGANIZATION = "/organization/{id}";
export const GET_ORGANIZATION_DETAILS = "/organization/{id}";
export const UPDATE_ORGANIZATION = "/organization";
export const GET_ORGANIZATION_SUMMARY = "/organization/{id}/summary";
export const GET_ALL_SUMMARY = "/organization/summary";
export const GET_ORGANIZATIONS = "/organization/";

/* Department Endpoints */
export const CREATE_DEPARTMENT = "/department";
export const DELETE_DEPARTMENT = "/department/{id}";
export const GET_DEPARTMENT_DETAILS = "/department/{id}";
export const UPDATE_DEPARTMENT = "/department";

/* Project Endpoints */
export const CREATE_PROJECT = "/project";
export const DELETE_PROJECT = "/project/{id}";
export const GET_PROJECT_DETAILS = "/project/{id}";
export const UPDATE_PROJECT = "/project";

/* Board Endpoints */
export const DELETE_BOARD = "/board/{id}";
export const GET_BOARD_DETAILS = "/board/{id}";
export const UPDATE_BOARD = "/board";
export const START_OR_COMPLETE_BOARD = "/board/session/{action}";

/* Section Endpoints */
export const CREATE_SECTION = "/section";
export const DELETE_SECTION = "/section/{id}";
export const GET_SECTIONS_BY_BOARD = "/section/{id}";
export const UPDATE_SECTION = "/section";

/* Note Endpoints */
export const DELETE_NOTE = "/note/{id}";
export const GET_NOTES_BY_SECTION_DETAILS = "/note/{id}";
export const UPDATE_NOTE = "/note";
export const MARK_AS_READ = "/note/{id}/mark-read";

/* Feedback Endpoints */
export const CREATE_FEEDBACK = "/feedback";
export const GET_FEEDBACKS = "/feedback";

/* Reaction Endpoints */
export const CREATE_OR_UPDATE_REACTION = "/react";
