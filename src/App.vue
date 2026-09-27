<script setup>
import index from '@/view/layout/index.vue'
</script>

<template>
  <index />
  <el-main>
      <router-view></router-view> <!-- 👈 路由出口，页面会渲染在这里 -->
  </el-main>
</template>

<style scoped>
</style>
