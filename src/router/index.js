// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 1. 导入你的页面组件（为了测试，可以先随便建一个组件，比如 Home.vue）
import login from "@/view/login/login.vue";
import layoutvue from "@/view/layout/index.vue";
import DeptView from "@/view/dept/index.vue";
import empview from "@/view/emp/index.vue";
const routes = [
  {
    path: "/",
    component: () => import("@/view/layout/index.vue"), // 改为动态导入
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "dept",
        component: () => import("@/view/dept/index.vue"),
      },
      {
        path: "emp",
        name: "emp",
        component: () => import("@/view/emp/index.vue"),
      },
    ],
  },
  { path: "/login", component: () => import("@/view/login/login.vue") }, // 改为动态导入
];

const router = createRouter({
  // 使用 HTML5 History 模式（无 # 号）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
