import * as config from "./config";

import { REFRESH_TOKEN } from "./endpoints";
import axios from "axios";

/* Set Axios config */
const axiosConfig = {
  baseURL: config.BASE_URL,
  timeout: 60000,
  headers: config.HEADERS,
};

let isAlreadyFetchingAccessToken = false;

/* Create instance */
const API: any = axios.create(axiosConfig);
const API_WITHOUT_INTERCEPTOR: any = axios.create(axiosConfig);

// Request interceptor for API calls
API.interceptors.request.use(
  async (config: any) => {
    const token: any = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        credentials: "include",
        Accept: "application/json",
      };
    }

    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    //"UNAUTHORIZED"
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("token");
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAlreadyFetchingAccessToken &&
      refreshToken // check if refresh token is available to generate new token
    ) {
      originalRequest._retry = true;
      isAlreadyFetchingAccessToken = true;
      const res: any = await API_WITHOUT_INTERCEPTOR(REFRESH_TOKEN, {
        method: "POST",
        data: { refreshToken: refreshToken },
      });
      if (res?.status === 200) {
        await localStorage.removeItem("refreshToken"); // remove token once new token is generated
        await localStorage.setItem("token", res.data.token);
        API.defaults.headers.common["Authorization"] = res.data.token;
        return API(originalRequest);
      }
      return API(originalRequest);
    }
    if (!(token || refreshToken) && error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login/";
      return Promise.reject(error);
    }
    return Promise.reject(error);

    // if (refreshToken && error?.response?.status === 401) {
    //   try {
    //     const res = await API_WITHOUT_INTERCEPTOR(REFRESH_TOKEN, {
    //       method: "POST",
    //       data: { refreshToken: refreshToken },
    //     });

    //     if (res.status === 200) {
    //       await localStorage.removeItem("refreshToken");
    //       await localStorage.setItem("token", res.data.token);
    //       API.defaults.headers["Authorization"] = res.data.token;
    //       originalRequest.headers["Authorization"] = res.data.token;
    //       return API(originalRequest);
    //     }
    //   } catch (err) {
    //     localStorage.clear();
    //     window.location.href = "/login/";
    //     return Promise.reject(error);
    //   }
    // } else {
    //   // window.location.href = "/login/";
    //   // return Promise.reject(error);
    // }

    // return Promise.reject(error);
  }
);

export default API;
