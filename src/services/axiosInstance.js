import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URI + "/api";

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${JSON.parse(token)}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export const Axios = axios;
