import { parseJwt } from "../../../util";
import { useSelector } from "react-redux";

export function useLogin() {
  const { token, success, message } = useSelector(
    (state: { [Key: string]: any }) => ({
      token: state.login.response?.token
        ? state.login.response?.token
        : sessionStorage.getItem("token"),
      success: state.login.response?.success,
      message: state.login.response?.message,
    })
  );
  const descodedData: { [Key: string]: any } = parseJwt(token);
  return {
    token,
    success,
    organizationId: descodedData?._id,
    message,
  };
}

export function useLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.login?.loading,
  }));
}

export function useVerifyToken() {
  return useSelector((state: { [Key: string]: any }) => ({
    response: state.login.response,
  }));
}

export function useResendToken() {
  return useSelector((state: { [Key: string]: any }) => ({
    errorId: state.login.response?.errorId,
    message: state.login.response?.message,
  }));
}

export function useForgotPassword() {
  return useSelector((state: { [Key: string]: any }) => ({
    errorId: state.login.response?.errorId,
    response: state.login.response,
  }));
}
