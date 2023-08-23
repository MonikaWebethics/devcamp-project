import axios from "axios";
import { getToken } from "Utility/token";

export const useAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

useAxios.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    config.headers["Authorization"] = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

useAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
