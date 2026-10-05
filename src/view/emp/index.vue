<script setup>
import { ref, reactive, onMounted } from 'vue'
import { h } from 'vue'
import {select} from '../../api/emp'
import { deletedept ,queryAllApi} from '../../api/dept'
import { ElMessage } from 'element-plus'
const selectall = async () => {
  const ref1 = await queryAllApi();
  if(ref1.code)
  emplist.value = ref1.data
  else{
    ElMessage({
      message: '查询失败',
      type: 'error',
    })
  }
}


const select1 = async () => {
  emplist.value = []
  const ref1 = await select(formInline);
  if(isArrays(ref1.data))
    emplist.value = ref1.data
  else
    emplist.value = [ref1.data]
  ElMessage('查询成功!')
}

const clear = async () => {
  await deletedept(emplist.value.id)
  selectall();
  ElMessage({
    message: '清空成功!',
    type: 'success',
  })

}
onMounted(() => {
  selectall();
})


const formInline = reactive({
  name: '',
  gender: '',
  // entry_date: '',
})

const emplist = ref([])


</script>

<template>
  <div class="emp-container">
    <!-- 标题 -->
    <h1 class="title">员工管理</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名"  >
        <el-input v-model="formInline.name" placeholder="请输入员工姓名" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.gender" placeholder="请选择" clearable>
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="入职时间">
        <el-date-picker v-model="formInline.entry_date" type="daterange" range-separator="到" start-placeholder="开始日期"
          end-placeholder="结束日期" :size="size" />
      </el-form-item> -->
      <el-form-item class="e4" >
        <el-button type="primary" @click="select1">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>


        <!-- <el-form-item label="入职时间">
        <el-date-picker v-model="formInline.entry_date" type="daterange" range-separator="到" start-placeholder="开始日期"
          end-placeholder="结束日期" :size="size" />
      </el-form-item> -->

    <el-table :data="emplist" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="name" label="姓名" width="200" align="center" />

      <!-- 性别需要转换：数据库存 1 和 2 -->
      <el-table-column label="性别" width="200" align="center">
        <template #default="scope">
          <span v-if="scope.row.gender == 1">男</span>
          <span v-else-if="scope.row.gender == 2">女</span>
          <span v-else>人妖</span>
        </template>
      </el-table-column>

      <el-table-column label="职位" align="center" width="200">
        <template #default="scope">
          <span v-if="scope.row.gender == 1">学生</span>
          <span v-else-if="scope.row.gender == 2">工人</span>
          <span v-else>无业游民</span>
        </template>
      </el-table-column>
      <!-- 头像展示，用 el-avatar -->
      <el-table-column label="头像" width="200" align="center">
        <template #default="scope">
          <!-- <el-avatar v-if="scope.row.avatar" :src="scope.row.avatar" size="small" /> -->
           <img :src="scope.row.avatar" alt="头像" width="50" height="50" v-if="scope.row.avatar" />
          <span v-else>无</span>
        </template>
      </el-table-column>

      <el-table-column prop="entry_date" label="入职时间" width="200" align="center" />
      <el-table-column prop="update_time" label="最后操作时间" width="200" align="center" />
    </el-table>
  </div>


</template>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

/* 让姓名、性别这两项平分剩余宽度，按钮项保持原样 */
.demo-form-inline .el-form-item:not(.e4) {
  margin-right: 16px;
}

.demo-form-inline .el-form-item:not(.e4) .el-form-item__content {
  min-width: 0;
}

.demo-form-inline .el-form-item:not(.e4) .el-input,
.demo-form-inline .el-form-item:not(.e4) .el-select {
  width: 100%;
}

.emp-container .title {
  font-size: 24px;
  border-left: solid 10px #409eff;
  padding-left: 10px;
}
</style>
