import { useSelector } from "react-redux";

export function useSecurityQuestion() {
  return useSelector((state: { [Key: string]: any }) => ({
    questions: state.securityQuestion?.questions,
    securityQuestionResponse: state.securityQuestion?.response,
  }));
}

export function useLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.securityQuestion?.loading,
  }));
}
