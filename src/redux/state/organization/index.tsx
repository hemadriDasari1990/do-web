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
