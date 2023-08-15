import * as axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.timeout = 60000;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function (config) {
    // Add the `accessToken` from LocalStorage to request headers and
    const accessToken = window.localStorage.getItem("accessToken");
    if (!!accessToken) {
      console.log("Token inside interceptor - ", accessToken);
      config.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios;
