<script setup>
import { ref, reactive, onMounted ,toRefs } from 'vue'
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


async function select1() {
  emplist.value = []
  const queryParams = {...formInline}
  if(queryParams.entry_date && queryParams.entry_date.length === 1) {
    queryParams.begin=queryParams.entry_date[0]
  }
    delete queryParams.entry_date//删除这里面的entry_date属性
  const ref1 = await select(queryParams)
  if (isArrays(ref1.data))//防止返回的不是数组从而导致报错
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
  entry_date:[]
})

const emplist = ref([])


const state = reactive({
  fits: ['contain'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})
const { fits, url } = toRefs(state)

</script>

<template>
  <div class="emp-container">
    <!-- 标题 -->
    <h1 class="title">员工管理</h1>
    <el-form :inline="true"  :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名"  >
        <el-input v-model="formInline.name" placeholder="请输入员工姓名" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.gender" placeholder="请选择" clearable>
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="formInline.entry_date" type="daterange" range-separator="到" start-placeholder="开始日期"
          end-placeholder="结束日期" :size="size" />
      </el-form-item>
      <el-form-item class="e4" >
        <el-button type="primary" @click="select1">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>


       

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
         <div class="demo-fit">
            <div v-for="fit in fits" :key="fit" class="block">
              <span class="title">{{ fit }}</span>
              <el-avatar shape="square" :size="100" :fit="fit" :src="url" />
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="begin" label="入职时间" width="200" align="center" />
      <el-table-column prop="end" label="最后操作时间" width="200" align="center" />
    </el-table>
  </div>


</template>

<style>
.demo-form-inline {
  display: flex;
  flex-wrap: nowrap; /* 🚫 强制不允许换行 */
  gap: 16px;
  align-items: center;
  width: 100%;
}

.demo-form-inline .el-form-item {
  flex: 1; /* 自动撑满剩余空间 */
  min-width: 0; /* 🌟 极其关键：防止里面的日期框把外层撑破 */
  margin-right: 0; /* 去掉原本的margin-right，靠gap控制 */
  margin-bottom: 0; /* 消除底部默认间距 */
}

/* 按钮项绝对不拉伸，且靠右对齐 */
.demo-form-inline .el-form-item.e4 {
  flex: none; 
  margin-left: auto; 
}

/* 保证内部控件撑满表单项 */
.demo-form-inline .el-input,
.demo-form-inline .el-select,
.demo-form-inline .el-date-editor {
  width: 100%;
}

.emp-container .title {
  font-size: 24px;
  border-left: solid 10px #409eff;
  padding-left: 10px;
}

/* 头像avarter样式 */
.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}
.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
