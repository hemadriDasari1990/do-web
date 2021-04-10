import {
  ADD_PROJECT_TO_STORE,
  DELETE_PROJECT_REQUEST,
  GET_PROJECTS_REQUEST,
  UPDATE_PROJECT_REQUEST,
} from "./types";

export const getProjects = (
  userId: string,
  queryString: string,
  page: number,
  size: number
) => {
  return {
    type: GET_PROJECTS_REQUEST,
    userId,
    queryString,
    page,
    size,
  };
};

export const updateProject = (payload: { [Key: string]: any }) => {
  return {
    type: UPDATE_PROJECT_REQUEST,
    url: `/project`,
    payload: payload,
  };
};

export const deleteProject = (projectId: string) => {
  return {
    type: DELETE_PROJECT_REQUEST,
    id: projectId,
  };
};

export const addProjectToStore = (project: { [Key: string]: any }) => {
  return {
    type: ADD_PROJECT_TO_STORE,
    payload: project,
  };
};
