import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // 拦截前端所有以 /api 开头的请求
        target: "http://localhost:8080/", // 转发给本地的 Tomcat（你的 Spring Boot）
        secure: false, // 允许代理 https 到 http（本地开发通常关闭安全检查）
        changeOrigin: true, // 核心！伪装请求头中的 Host，让后端以为请求直接来自 8080
        rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写：去掉 /api 前缀
      },
    },
  },
});
