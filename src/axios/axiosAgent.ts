import {
    refreshTokenThunk,
    signOutThunk,
  } from "@redux/reducers/auth/authActions";
  import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
  import { signOut } from "next-auth/react";
  import Cookies from "universal-cookie";
  import store from "../redux/core";
  
  const cookies = new Cookies();
  
  let refreshTokenCount = 0;
  
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";
  
  axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    const token = cookies.get("template-token");
    if (token) config.headers!.authorization = `Bearer ${token}`;
    config.withCredentials = true;
    return config;
  });
  
  axios.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      let isRefreshingToken = false;
  
      if (error.response) {
        let { status, data } = error.response!;
        switch (status) {
          case 401:
            /* If backend require to close user session */
            if (data.data.closeSession) signOut();
  
            /* If backend require to refresh token */
            if (data.data.refreshToken && refreshTokenCount <= 3) {
              refreshTokenCount = refreshTokenCount + 1;
              isRefreshingToken = true;
            } else {
              console.log("logout");
              cookies.remove("template-token", { path: "/" });
              store.dispatch(signOutThunk());
              window.location.reload();
            }
            console.log(401);
            break;
          case 403:
            console.log(403);
            break;
          case 404:
            console.log(404);
            break;
          case 409:
            console.log(404);
            break;
          case 500:
            console.log(500);
            break;
        }
  
        /* if refresh token is require, request a new accessToken */
        if (isRefreshingToken) {
          const req = await store.dispatch(refreshTokenThunk());
  
          if (req.type.includes("fulfilled")) {
            isRefreshingToken = false;
            return axios.request(error.config);
          }
        } else {
          return error.response;
        }
      }
  
      return { data: { success: false } };
    }
  );
  
  const responseBody = (response: AxiosResponse) => {
    if (response.data.success) {
      return response.data;
    }
    return Promise.reject(response.data);
  };
  
  const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    getBlob: <T>(url: string) =>
      axios.get<T>(url, { responseType: "blob" }).then(responseBody),
    post: <T>(url: string, body: {}) =>
      axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) =>
      axios.patch<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  };
  
  export { requests };
  