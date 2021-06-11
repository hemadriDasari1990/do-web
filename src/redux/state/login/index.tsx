import { parseJwt } from "../../../util";
import { useSelector } from "react-redux";

export function useLogin() {
  const { token, success, message, accountType, loginSuccess } = useSelector(
    (state: { [Key: string]: any }) => ({
      token: state.login.response?.token
        ? state.login.response?.token
        : localStorage.getItem("token"),
      success: state.login.response?.success,
      message: state.login.response?.message,
      accountType: state.login.response?.accountType,
      loginSuccess: state.login.loginSuccess,
    })
  );
  const descodedData: { [Key: string]: any } = token ? parseJwt(token) : null;
  return {
    accountType: accountType || descodedData?.accountType,
    token,
    success,
    userId: descodedData?._id,
    memberId: descodedData?.memberId,
    email: descodedData?.email,
    message,
    loginSuccess,
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

export function useResendActivation() {
  return useSelector((state: { [Key: string]: any }) => ({
    errorId: state.login.response?.errorId,
    response: state.login.response,
  }));
}
