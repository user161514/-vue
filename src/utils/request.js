import axios from "axios";
const request = axios.create({
  baseURL: "api",
  timeout: 6000000,
});

request.interceptors.response.use(
  (response) => {
    return response.data; // 第一个参数：请求成功（HTTP 200）时进入
  },
  (error) => {
    return Promise.reject(error); // 第二个参数：请求失败（404、500、网络超时）时进入，这里的 Promise.reject(error)，你直接翻译成 Java 的 throw new RuntimeException(error) 即可！（会将方法内的错误往外翻）
  },
);
export default request;
