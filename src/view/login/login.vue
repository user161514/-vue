<script setup>
import { Document } from '@element-plus/icons-vue'
</script>

<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" router>
    <el-menu-item index="/login"><el-button type="primary" icon="Document">登录</el-button>
      <el-button type="primary" icon="Document">注册</el-button>
      <el-button type="primary" icon="Document">忘记密码</el-button></el-menu-item>
  </el-menu>


</template>

<style scoped></style>