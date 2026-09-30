<template>
  <div class="dept-container">
    <!-- 标题 -->
    <h1 class="title">部门管理</h1>

    <!-- 新增按钮 -->
    <el-button type="primary" class="add-btn" @Click="addDept">+ 新增部门</el-button>

    <!-- 表格 -->
    <el-table :data="emplist" border style="width: 100%"
      :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#333' }">
      <el-table-column prop="id" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="部门名称" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" align="center" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <!-- 图片中的按钮为橙色文字，使用 link + warning -->
          <el-button link type="primary" size="small" @click="editDept"><el-icon>
              <EditPen />
            </el-icon >编辑</el-button>
          <el-button link type="danger" size="small"><el-icon>
              <DeleteFilled />
            </el-icon>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
 <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="change" width="500">
    <el-form :model="dept">
      <el-form-item label="*部门名称" :label-width="formLabelWidth">
        <el-input v-model="dept.name"  placeholder="请输入部门名称"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,onMounted} from 'vue'
import { queryAllApi } from '../../api/dept'
import axios from 'axios'

const emplist = ref([])
const select=async()=>{
  const ref1=await queryAllApi();
  if(ref1.code)
  {emplist.value=ref1.data}
}
const save=()=>{
}
onMounted(()=>{
  select()
})
const change = ref('')
const dialogFormVisible = ref(false)
const dept=ref({"name":""})
const formLabelWidth = ref('80px')
const addDept = () => {
  dialogFormVisible.value = true,
  change.value = '新增部门'
}

const editDept = () => {
  dialogFormVisible.value = true,
  change.value = '编辑部门'
}

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
  margin-top:0%;
}
</style>