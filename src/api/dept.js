import request from "@/utils/request";

export const queryAllApi = () => request.get("dept1");
// 推荐写法：使用 params 属性
export const adddept = (name) =>
  request.post("dept", null, { params: { name } });

// 修改前：request.get(`dept/${id}`)
export const queryreturn = (id) => request.get(`dept2/${id}`);

export const updatedept = (name, id) =>
  request.put(`update`, null, { params: { name, id } });
