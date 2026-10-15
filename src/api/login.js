import request from "@/utils/request";

export const login = (loginForm) => {
  return request.post(`/login`, loginForm);
};
