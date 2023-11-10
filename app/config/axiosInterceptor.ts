import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = Cookies.get("authToken");
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = JSON.parse(accessToken);
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
