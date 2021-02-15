import {
    DELETE_DEPARTMENT_REQUEST,
    GET_DEPARTMENT_REQUEST,
    UPDATE_DEPARTMENT_REQUEST
} from "./types";

export const getDepartmentDetails = (departmentId: string) => {
    return {
        type: GET_DEPARTMENT_REQUEST,
        id: departmentId
    }
}

export const updateDepartment = (payload: {[Key: string]: any}) => {
    return {
        type: UPDATE_DEPARTMENT_REQUEST,
        url: `/department`,
        payload: payload
    }
}

export const deleteDepartment = (departmentId: string) => {
    return {
        type: DELETE_DEPARTMENT_REQUEST,
        url: `/department/${departmentId}`
    }
}
