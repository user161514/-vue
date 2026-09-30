import request from "@/utils/request";

export const queryAllApi = () => request.get("dept");
export const adddept = (data) => request.post("dept", data);
