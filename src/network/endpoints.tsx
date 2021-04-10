/**
 * API Endoints
 */

/* Login Endpoints */
export const LOGIN = "/auth/login";
export const LOGOUT = "/auth/logout";
export const REFRESH_TOKEN = "/auth/refresh-token";
export const VERIFY_TOKEN = "/auth/verify-token";
export const RESEND_TOKEN = "/auth/resend-token";
export const FORGOT_PASSWORD = "/auth/forgot-password";
export const VALIDATE_FORGOT_PASSWORD = "/auth/validate-forgot-password";
export const RESET_PASSWORD = "/auth/reset-password";

/* User Endpoints */
export const CREATE_USER = "/user";
export const DELETE_USER = "/user/{id}";
export const GET_USER_DETAILS = "/user/{id}";
export const UPDATE_USER = "/user";
export const GET_USER_SUMMARY = "/user/{id}/summary";
export const GET_ALL_SUMMARY = "/user/summary";
export const GET_USERS = "/user/";
export const GET_BOARDS_BY_USER = "/user/{id}/boards";

/* Department Endpoints */
export const CREATE_DEPARTMENT = "/department";
export const DELETE_DEPARTMENT = "/department/{id}";
export const GET_DEPARTMENT_DETAILS = "/department/{id}";
export const UPDATE_DEPARTMENT = "/department";

/* Team Endpoints */
export const CREATE_TEAM = "/team";
export const DELETE_TEAM = "/team/{id}";
export const GET_TEAM_DETAILS = "/team/{id}";
export const UPDATE_TEAM = "/team";
export const ADD_OR_REMOVE_TEAM_MEMBER = "/team/{id}/member";
export const GET_TEAMS = "/team";
export const SEND_INVITE_TO_TEAMS = "/team/invitation";

/* Member Endpoints */
export const CREATE_MEMBER = "/member";
export const DELETE_MEMBER = "/member/{id}";
export const GET_MEMBERS_BY_USER = "/member?userId={id}";
export const GET_MEMBER_DETAILS = "/member/{id}";
export const UPDATE_MEMBER = "/member";

/* Project Endpoints */
export const CREATE_PROJECT = "/project";
export const DELETE_PROJECT = "/project/{id}";
export const GET_PROJECTS = "/project";
export const UPDATE_PROJECT = "/project";

/* Board Endpoints */
export const DELETE_BOARD = "/board/{id}";
export const GET_BOARD_DETAILS = "/board/{id}";
export const UPDATE_BOARD = "/board";
export const GET_BOARDS = "/board";

/* Section Endpoints */
export const GET_SECTIONS_BY_BOARD = "/section/{id}";

/* Note Endpoints */
export const DELETE_NOTE = "/note/{id}";
export const GET_NOTES_BY_SECTION_DETAILS = "/note/{id}";
export const MARK_AS_READ = "/note/{id}/mark-read";

/* Reaction Endpoints */
export const GET_REACTIONS_SUMMARY_BY_BOARD = "/reactions/{boardId}/summary";
export const GET_REACTIONS = "/reactions";

/* Feedback Endpoints */
export const CREATE_FEEDBACK = "/feedback";
export const GET_FEEDBACKS = "/feedback";

/* Reaction Endpoints */
export const CREATE_OR_UPDATE_REACTION = "/react";
