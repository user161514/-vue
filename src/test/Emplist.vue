<script setup>
import axios from 'axios'
import {ref,onMounted} from 'vue'
const emp = ref({
  name: '',
  gender: '',
  job: '',
})

const clear = () => {
  emp.value = {name: '', gender: '', job: ''}
  select()
}
const select = async () => { 
  let ref1=await axios.get(`http://localhost:8080/Emp22/list?name=${emp.value.name}&gender=${emp.value.gender}&job=${emp.value.job}`)
  emplist.value = ref1.data.data

}

onMounted(() => {
  select()
})
const emplist = ref([])



</script>

<template>

  <div id="container">
    <el-form :inline="true" :model="emp" class="demo-form-inline">
      <el-form-item label="姓名" >
        <el-input v-model="emp.name" placeholder="请输入！" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="emp.gender" placeholder="请输入！" clearable>
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>


      <el-form-item label="职位" >
        <el-select v-model="emp.job" placeholder="请输入！" clearable>
          <el-option label="学生" value="1" />
          <el-option label="工人" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="Successful" @click="select">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>


  <div id="container" style="padding: 20px;">
    <el-table :data="emplist" border style="width: 80%" size="default">
      <!-- 1. ID 列 -->
      <el-table-column prop="id" label="ID" width="80" align="center" />
      
      <!-- 2. 姓名 列 -->
      <el-table-column prop="name" label="姓名" width="120" align="center" />
      
      <!-- 3. 头像 列（需要用插槽自定义显示图片） -->
      <el-table-column label="头像" width="120" align="center">
        <template #default="scope">
          <img src="../../150.jpg" width="80" height="80"  referrerpolicy="no-referrer" />
        </template>
      </el-table-column>
      
      <!-- 4. 性别 列 -->
      <el-table-column label="性别" width="100" align="center" >
        <template #default="scope">
          {{ scope.row.gender == 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <!-- 5. 职位 列 -->
      <el-table-column  label="职位" width="150" align="center" >
        <template #default="scope">
          {{ scope.row.job == 1 ? "学生" : "工人" }}
        </template>
      </el-table-column>
      
      <!-- 6. 入职日期 列 -->
      <el-table-column prop="entryDate" label="入职日期" width="180" align="center" />
      
      <!-- 7. 更新时间 列 -->
      <el-table-column prop="updateTime" label="更新时间" align="center" />
    </el-table>
  </div>
</template>

<style>
/* .demo-form-inline .el-input {
  --el-input-width: 200px;
}

.demo-form-inline .el-select {
  --el-select-width: 200px;
} */

#container {
  margin-left: 15%;
  margin-right: 15%;
}
</style>
