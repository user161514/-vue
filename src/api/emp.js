import request from "@/utils/request";

// export const select = (name, gender, begin, end) =>
//   request.get(`/emp?name=${name}&gender=${gender}&begin=${begin}&end=${end}`);

export const querylimit = (emp, currentPage4, pageSize4) => {
  return request.get("/emp2", {
    params: {
      name: emp.name,
      gender: emp.gender,
      begin: emp.begin,
      end: emp.end,
      currentPage4: currentPage4, // 顺便把后端能认识的名字改对
      pageSize4: pageSize4,
    },
  });
};
