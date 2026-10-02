<script setup>
import { ref, onMounted ,reactive} from 'vue'
import { queryAllApi, adddept,queryreturn } from '../../api/dept'
import { ElMessage } from 'element-plus'


const emplist = ref([])
const select = async () => {
  const ref1 = await queryAllApi();
  if (ref1.code) { emplist.value = ref1.data }
}

const rules = reactive({
  name: [
    { required: true, message: '部门名称是必填项', trigger: 'blur' },
    { min: 2, max: 10, message: '名称长度必须在2-10位!', trigger: 'blur' },
  ]})
const save = async () => {
  //函数内部定义一个函数（记得调用）
    const submitForm = async () => {
  if (!deptFormRef.value) return;
  deptFormRef.value.validate(async(valid) => {
    if (valid) {
       const res = await adddept(dept.value.name)
  if (res.code) {
    ElMessage({
    showClose: true,
    message: '新增部门成功',
    type: 'success',
  })
    dialogFormVisible.value = false
    select()
  }
    } else {
     ElMessage({
    showClose: true,
    message: '新增部门失败',
    type: 'error',
  })
    }
  })
}
submitForm();
}
const dept = ref({
  name: '',
})

onMounted(() => {
  select()
})
const change = ref('')
const dialogFormVisible = ref(false)
const formLabelWidth = ref('80px')
const deptFormRef = ref()
// 点击"新增部门"按钮
const addDept = () => {
  change.value = '新增部门'
  dialogFormVisible.value = true
  // 把表单内容清空，防止带上一次编辑过的字---------这里{} 能用，{ name: '' } 更稳，因为其他地方双向绑定了name属性，你把这个属性都搞没了，不费了吗
  dept.value = {
    name: ''
  }
  清掉输入框下面红色的报错提示
  if (deptFormRef.value) {
    deptFormRef.value.clearValidate()
  }
}


// 点击某一行的"编辑"按钮
const edit = async (id) => {
  change.value = '编辑部门'
  dialogFormVisible.value = true

  // 去后端查这一条数据
  const res = await queryreturn(id)

  // 后端返回的 res.data 是个数组，比如 [{ name: "文泽宏" }]
  // 我们只想要里面那一条，所以取出第一项
  const row = res.data[0]

  // 如果查不到（比如 id 写错了），提示一下就关掉弹窗
  if (!row) {
    ElMessage.warning('未查询到该部门数据')
    dialogFormVisible.value = false
    return
  }

  // 把查到的名字填进表单
  dept.value = {
    name: row.name
  }
}

</script>



<template>
  <div class="dept-container">
    <!-- 标题 -->
    <h1 class="title">部门管理</h1>

    <!-- 新增按钮 -->
    <el-button type="primary" class="add-btn" @click="addDept" >
      + 新增部门</el-button>

    <!-- 表格 -->
    <el-table :data="emplist" border style="width: 100%"
      :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#333' }">
      <el-table-column prop="id" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="部门名称" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" align="center" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <!-- 图片中的按钮为橙色文字，使用 link + warning -->
          <el-button link type="primary" size="small" @click="edit(scope.row.id)"><el-icon>
              <EditPen />
            </el-icon>编辑</el-button>
          <el-button link type="danger" size="small"><el-icon>
              <DeleteFilled />
            </el-icon>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="change" width="500">

     <el-form
    ref="deptFormRef"
    style="max-width: 600px"
    :model="dept"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="dept.name"></el-input>
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
  margin-top: 0%;
}
</style>