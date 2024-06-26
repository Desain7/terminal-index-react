import axios from "axios";

// 自定义 axios 实例
const myAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://terminal-index-35248-7-1313550761.sh.run.tcloudbase.com/api"
      : "http://localhost:7345/api",
});

const user = JSON.parse(localStorage.getItem("user-store") as string);

myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (user) {
      config.headers.Authorization = user.jwtToken;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    console.log(response);
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default myAxios;
