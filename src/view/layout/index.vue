<template>
  <el-container class="layout-container">
    <!-- 顶部栏 -->
    <el-header class="header">
      <div class="title">Tlias智能学习辅助系统</div>
      <div class="user-info">
        <span>修改密码</span>
        <span>|</span>
        <span>退出登录</span>
      </div>
    </el-header>

    <el-container class="main-container">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" class="aside">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu router>
          <!-- 首页 -->
           <router-link to="/index">
          <el-menu-item index="1">
            <el-icon><Promotion /></el-icon>
            <span>首页</span>
          </el-menu-item>
          </router-link>
          <!-- 班级学员管理 -->
          <el-sub-menu index="/emp">
            <template #title>
              <el-icon><Grid /></el-icon>
              <span>班级学员管理</span>
            </template>
            <el-menu-item index="/clazz">
              <el-icon><HelpFilled /></el-icon>班级管理
            </el-menu-item>
            <el-menu-item index="emp">
              <el-icon><Avatar /></el-icon>学员管理
            </el-menu-item>
          </el-sub-menu>

          <!-- 系统信息管理 -->
          <el-sub-menu index="/system">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统信息管理</span>
            </template>
            <el-menu-item index="/dept">
              <el-icon><Aim /></el-icon>部门管理
            </el-menu-item>
            <el-menu-item index="/report">
              <el-icon><User /></el-icon>员工管理
            </el-menu-item>
          </el-sub-menu>

          <!-- 数据统计管理 -->
          <el-sub-menu index="/stu">
            <template #title>
              <el-icon><DataLine /></el-icon>
              <span>数据统计管理</span>
            </template>
            <!-- 截图里这项没展开，如果有子菜单可以在这里加 -->
            <el-menu-item index="/login">
              <el-icon><Document /></el-icon>数据报表
            </el-menu-item>
          </el-sub-menu>
          </el-menu>
        </el-menu>
      </el-aside>

      <!-- 右侧核心展示区域 -->
      <el-main class="main">
       <!-- 路由出口：这里会渲染匹配到的页面 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// 按需引入需要的图标，如果你的项目已经全局注册了图标，可以省略 import
import { 
  Promotion, 
  Grid, 
  HelpFilled, 
  Avatar, 
  Setting, 
  Aim, 
  User, 
  DataLine, 
  Document 
} from '@element-plus/icons-vue'
</script>

<style scoped>
/* 让整个布局占满屏幕高度 */
.layout-container {
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* 顶部栏样式 */
.header {
  background: linear-gradient(to right, #007bff, #28a745);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: bold;
  height: 60px;
}

.user-info span {
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
}

.main-container {
  height: calc(100vh - 60px); /* 减去顶部栏的高度 */
}

/* 左侧菜单栏样式 */
.aside {
  border-right: 1px solid #e6e6e6;
  background-color: #ffffff; /* 背景设为白色更符合截图 */
}

/* 覆盖 Element Plus 菜单默认样式，让它看起来更像截图 */
.el-menu-vertical-demo {
  border-right: none; /* 移除菜单自带的右侧边框，防止和 aside 边框重叠 */
}

/* 右侧核心区样式 */
.main {
  padding: 20px;
  background-color: #f5f7fa; /* 右侧内容区常用浅灰背景 */
  color: #606266;
}
</style>