import {
    CREATE_ORGANIZATION_REQUEST,
    DELETE_ORGANIZATION_REQUEST,
    GET_ORGANIZATION_REQUEST,
    UPDATE_ORGANIZATION_REQUEST
} from "./types";

export const getOrganizationDetails = (organizationId: string) => {
    return {
        type: GET_ORGANIZATION_REQUEST,
        id: organizationId
    }
}

export const createOrganization = (payload: {[Key: string]: any}) => {
    return {
        type: CREATE_ORGANIZATION_REQUEST,
        url: `/organization`,
        payload: payload
    }
}

export const updateOrganization = (payload: {[Key: string]: any}) => {
    return {
        type: UPDATE_ORGANIZATION_REQUEST,
        url: `/organization`,
        payload: payload
    }
}

export const deleteOrganization = (organizationId: string) => {
    return {
        type: DELETE_ORGANIZATION_REQUEST,
        url: `/organization/${organizationId}`
    }
}
