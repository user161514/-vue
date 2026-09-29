<template>
  <div class="dept-container">
    <!-- 标题 -->
    <h1 class="title">部门管理</h1>

    <!-- 新增按钮 -->
    <el-button type="primary" class="add-btn">+ 新增部门</el-button>

    <!-- 表格 -->
    <el-table :data="emplist" border style="width: 100%"
      :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#333' }">
      <el-table-column prop="id" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="部门名称" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" align="center" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <!-- 图片中的按钮为橙色文字，使用 link + warning -->
          <el-button link type="primary" size="small"><el-icon>
              <EditPen />
            </el-icon>编辑</el-button>
          <el-button link type="danger" size="small"><el-icon>
              <DeleteFilled />
            </el-icon>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref,onMounted} from 'vue'
import axios from 'axios'
const emplist = ref([])
const select=async()=>{
  const ref1=await axios.get('https://m1.apifoxmock.com/m2/8889091-8687904-default/520498063');
  if(ref1.data.code==1)
  {emplist.value=ref1.data.data}
}
onMounted(()=>{
  select()
})
</script>

<style scoped>
/* 标题样式：添加左侧蓝色竖条 */
.title {
  color: rgb(0, 128, 255);
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 4px solid rgb(0, 128, 255);
  /* 左侧蓝色竖线 */
  line-height: 1.2;
}

/* 新增按钮样式：底部留白 */
.add-btn {
  margin-bottom: 15px;
}
</style>