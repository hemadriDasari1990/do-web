import {
    DELETE_PROJECT_REQUEST,
    GET_PROJECT_REQUEST,
    UPDATE_PROJECT_REQUEST
} from "./types";

export const getProjectDetails = (projectId: string) => {
    return {
        type: GET_PROJECT_REQUEST,
        id: projectId
    }
}

export const updateProject = (payload: {[Key: string]: any}) => {
    return {
        type: UPDATE_PROJECT_REQUEST,
        url: `/project`,
        payload: payload
    }
}

export const deleteProject = (projectId: string) => {
    return {
        type: DELETE_PROJECT_REQUEST,
        id: projectId
    }
}
