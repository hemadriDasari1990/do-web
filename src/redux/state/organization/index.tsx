import { useSelector } from "react-redux";

export function useOrganization() {
  return useSelector((state: { [Key: string]: any }) => ({
    organization: state.organization.response,
    title: state.organization.response?.title,
    description: state.organization.response?.description,
    departments: state.organization.response?.departments,
    totalDepartments: state.organization.response?.totalDepartments,
    message: state.organization.response?.message,
  }));
}

export function useOrganizationLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.organization?.loading,
  }));
}

export function useOrganizationSummary() {
  return useSelector((state: { [Key: string]: any }) => ({
    summary: state.organization.summary,
  }));
}

export function useAllSummary() {
  return useSelector((state: { [Key: string]: any }) => ({
    summary: state.organization.summary,
  }));
}

export function useOrganizations() {
  return useSelector((state: { [Key: string]: any }) => ({
    organizations: state.organization?.organizations,
  }));
}
