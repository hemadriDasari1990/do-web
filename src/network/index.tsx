import * as config from "./config";

import { REFRESH_TOKEN } from "./endpoints";
import axios from "axios";

/* Set Axios config */
const axiosConfig = {
  baseURL: config.BASE_URL,
  timeout: 60000,
  headers: config.HEADERS,
};

/* Create instance */
const API: any = axios.create(axiosConfig);
const API_WITHOUT_INTERCEPTOR: any = axios.create(axiosConfig);

API.interceptors.request.use((config: any) => {
  const token: any = sessionStorage.getItem("token");
  if (token) {
    config.headers.credentials = "include";
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

API.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    //"UNAUTHORIZED"
    const originalRequest = error.config;
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (refreshToken && error?.response?.status === 401) {
      try {
        const res = await API_WITHOUT_INTERCEPTOR(REFRESH_TOKEN, {
          method: "POST",
          data: { refreshToken: refreshToken },
        });

        if (res.status === 200) {
          await sessionStorage.removeItem("refreshToken");
          await sessionStorage.setItem("token", res.data.token);
          API.defaults.headers["Authorization"] = res.data.token;
          originalRequest.headers["Authorization"] = res.data.token;
          return API(originalRequest);
        }
      } catch (err) {
        await sessionStorage.removeItem("token");
        await sessionStorage.removeItem("refreshToken");
        window.location.href = "/login/";
        return Promise.reject(error);
      }
    } else {
      // await sessionStorage.removeItem("token");
      // await sessionStorage.removeItem("refreshToken");
      // window.location.href = "/login/";
      // return Promise.reject(error);
    }
    if (!refreshToken && error?.response?.status === 401) {
      await sessionStorage.removeItem("token");
      await sessionStorage.removeItem("refreshToken");
      window.location.href = "/login/";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default API;
