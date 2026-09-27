// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 1. 导入你的页面组件（为了测试，可以先随便建一个组件，比如 Home.vue）
import Home from "@/views/Home.vue";
import index from "@/view/index/index.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/index", name: "index", component: index },
];

const router = createRouter({
  // 使用 HTML5 History 模式（无 # 号）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
