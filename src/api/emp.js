import request from "@/utils/request";

export const select = (emp) => request.get("emp", { params: emp });
