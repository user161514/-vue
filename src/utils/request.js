import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";

const request = axios.create({
  baseURL: "api",
  timeout: 6000000,
});

request.interceptors.response.use(
  (response) => {
    return response.data; // 第一个参数：请求成功（HTTP 200）时进入
  },
  (error) => {
    if (error.response.status === 401) {
      ElMessage.error("登入失败，请重新登录!");
      router.push("/login");
    } else {
      ElMessage.error("接口访问异常");
    }
    promise.reject(error);
  },
);

// ================= 新增：请求拦截器 =================
request.interceptors.request.use(
  (config) => {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (info && info.token) {
      config.headers.token = info.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
