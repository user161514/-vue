<script setup>
</script>

<template>
  <div class="w22">
    <el-button type="primary" :icon="Edit" />
    <el-button type="primary" :icon="Share" />
    <el-button type="primary" :icon="Delete" />
    <el-button type="primary" :icon="Search">Search</el-button>
    <el-button type="primary">
      Upload<el-icon class="el-icon--right">
        <Upload />
      </el-icon>
    </el-button>
  </div>

  <div class="w22"><el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="date" label="生日" width="180" align="center" />
      <el-table-column prop="name" label="行吗" width="180" align="center" />
      <el-table-column prop="address" label="数组" width="180" align="center" />
      <el-table-column prop="shafu" label="沙夫" width="180" align="center" />
    </el-table>
  </div>

  <!-- 分页 -->
  <div class="w22" background="true"><el-pagination v-model:current-page="currentPage1" v-model:page-size="pageSize1"
      :page-sizes="[100, 200, 300, 400]" :size="size" :disabled="disabled" :background="background" :total="total"
      layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>

  <div class="w22">
    <el-button class="!ml-0" plain @click="dialogTableVisible = true">
      Open a Table nested Dialog
    </el-button>

    <el-dialog v-model="dialogTableVisible" title="Shipping address" width="800">
      <el-table :data="tableData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>
  </div>

  <div class="w22">
    <el-form :inline="true" :model="user" class="demo-form-inline">
      <el-form-item label="用户">
        <el-input v-model="user.用户" placeholder="请输入!" clearable />
      </el-form-item>
      <el-form-item label="地区">
        <el-select v-model="user.地区" placeholder="请输入!" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="user.生日" type="date" placeholder="请输入！" clearable value-format="YYYY-MM-DD"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

interface User {
  date: string
  name: string
  address: string
  shafu: string
}
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    shafu: '沙夫1',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    shafu: '沙夫2',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    shafu: '沙夫3',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    shafu: '沙夫4',
  },
]

import { ref } from 'vue'
const currentPage1 = ref(4)
const pageSize1 = ref(100)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)
const total = ref(400)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

const dialogTableVisible = ref(false)


const user = ref({
  用户 : '',
  地区 :'',
  生日 : '',
})
const onSubmit = () => {
  console.log(user.value)
}
</script>

<style scoped>
.w22 {
  margin-bottom: 20px;
}

:deep(.el-table .warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

:deep(.el-table .success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

/* 分页 */
/* :deep(.example-pagination-block + .example-pagination-block) {
  margin-top: 10px;
}
:deep(.example-pagination-block .example-demonstration) {
  margin-bottom: 16px;
} */

:deep(.demo-form-inline .el-input) {
  --el-input-width: 220px;
}

:deep(.demo-form-inline .el-select) {
  --el-select-width: 220px;
}
</style>
