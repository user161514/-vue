<script setup>
import { ref, reactive, onMounted, toRefs, watch } from 'vue'
import { querylimit } from '../../api/emp'
import { ElMessage } from 'element-plus'
import { Plus, Delete, Edit } from '@element-plus/icons-vue'


//定义表单Form对象formInline
const formInline = ref({
  name: '',
  gender: '',
  data: [],
  begin: '',
  end: '',
})


// const selectall = async () => {

//   const ref1 = await queryAllApi();
//   if (ref1.code)
//     emplist.value = ref1.data
//   else {
//     ElMessage({
//       message: '查询失败',
//       type: 'error',
//     })
//   }
// }


//监听器
watch(() => { return formInline.value.data }, (newval, oldval) => {
  if (newval.length == 2) {
    formInline.value.begin = newval[0]
    formInline.value.end = newval[1]
  }
  else {
    formInline.value.begin = ''
    formInline.value.end = ''
  }
})


async function select1() {
  const newform = formInline.value
  console.log(newform)
  emplist.value = []
  // const ref1 = await select(formInline.value.name,formInline.value.gender,formInline.value.begin,formInline.value.end)
  const ref2 = await querylimit(formInline.value, currentPage4.value, pageSize4.value)
  if (ref2.code) {
    emplist.value = ref2.data.rows
    total.value = ref2.data.total
  }

}

const clear = () => {
  formInline.value = { name: "", gender: "", data: [], begin: '', end: '' }
  select1();
}


//token获取
const token=ref('')

const gettoken=()=>{
  const tokens=JSON.parse(localStorage.getItem("userInfo")),
  if(tokens&&tokens.password)
{
  token.value=tokens.password
}
}
onMounted(() => {
  select1();
  gettoken();
})



const buttons = [
  { type: 'info', text: '编辑' },
  { type: 'warning', text: '清空' },
]


const emplist = ref([])


const state = reactive({
  fits: ['contain'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})
const { fits, url } = toRefs(state)


const currentPage4 = ref(1)
const pageSize4 = ref(10)
const background = ref(true)
const total = ref(0)
const handleSizeChange = (val) => {
  select1();
}
const handleCurrentChange = (val) => {
  select1();
}

const dialogTableVisible = ref(false)
let uid=0
const form = ref(
  {
    id_:uid++,
    username: '',      // 用户名
    name: '',          // 姓名
    gender: null,      // 性别 (1:男, 2:女)
    phone: '',         // 手机号
    job: null,         // 职位 (1:学生, 2:工人)
    salary: null,      // 薪资 (数字)
    deptId: null,      // 所属部门 (存部门ID)
    entryDate: '',     // 入职日期 (存日期字符串)
    image: '',         // 头像 (存上传后的URL)
    // 工作经历 (包含时间、公司、职位)
    empList: [
      // 初始给一行空的，如果不想默认显示一行，就改成 []
      // 注意：这里的字段名要根据你 Java 里 emp_expr 类的实际字段名修改
      { company: '', begin: '',end: '', job: '', empdate: []}
    ]
  }
)

const region=ref([
  {
    addr:"海南",value:"1"
  },{
    addr:"深圳",value:"2"
  }
])


const handleAvatarSuccess = (response) => {
  console.log(response);
  if(response.code)
{
  form.value.image=response.data;
}
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg'&&rawFile.type!=='image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const save=()=>{
  dialogTableVisible.value=true
  form.value=  {
    username: '',      // 用户名
    name: '',          // 姓名
    gender: null,      // 性别 (1:男, 2:女)
    phone: '',         // 手机号
    job: null,         // 职位 (1:学生, 2:工人)
    salary: null,      // 薪资 (数字)
    deptId: null,      // 所属部门 (存部门ID)
    entryDate: '',     // 入职日期 (存日期字符串)
    image: '',         // 头像 (存上传后的URL)
    // 工作经历 (包含时间、公司、职位)
    empList: []
  }
}

const addemplist=()=>{
   form.value.empList.push({company:'',begin:'',end:'',job:'',empdate:[]})
}


watch(()=>{return form.value.empList},(newval)=>{
     if(form.value.empList&&form.value.empList.length>0)
     {
      form.value.empList.forEach(element => {
        element.begin=element.empdate[0]
        element.end=element.empdate[1]
      });
     }
},{deep:true})


//删除员工工作经历
const deleteemp=(index)=>{
  form.value.empList.splice(index, 1)
}

//表单校验规则
const rules=reactive({
  username:[
    {required:true,message:"请输入",trigger:"change"},
    {min:2,max:20,message:"长度应控制在2-20以内", trigger:"change"},
    {
      pattern:/^1\d{2}@qq\.com$/,message:"你的格式不对",trigger:"change",
    }
  ]
})

//管理对话框的标题
const title=ref("编辑员工")

</script>

<template>
  <div class="container">
    <!-- 标题 -->
    <h1 class="title">员工管理</h1>
    <el-button type="primary" plain @click="save">+新增员工</el-button>

    <el-dialog v-model="dialogTableVisible" :title="title" width="800" >

      <el-form :model="form" label-width="auto" :rules="rules" style="max-width: 1200px">
        <el-row gutter="20">
          <el-col :span="12" >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入员工用户名,2-20个字"/>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入员工姓名,2-10个字" />
            </el-form-item>
          </el-col></el-row>

        <row> <el-col :span='24'>
              <el-upload class="avatar-uploader" action="http://localhost:8080/url" :show-file-list="true" :headers="{"token":token}"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="form.image" :src="form.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-col></row>
        
        <el-row>
          <el-col :span="12">
            <el-form-item label="职位">
      <el-select v-model="region.job" placeholder="请输入地区">
        <el-option v-for="regions in region" :label="regions.addr" :value="regions.value" />
      </el-select>
    </el-form-item>
            </el-col>
        </el-row>

            <el-button type="primary" plain @click="addemplist">+新增员工工作经历</el-button>
            <el-row>
         <el-form :inline="true" :model="emp" class="demo-form-inline" v-for="(emp,index) in form.empList">
            <el-form-item label="公司">
              <el-input v-model="emp.company" placeholder="请输入公司名称" clearable />
            </el-form-item>
            <el-form-item label="职位">
              <el-select v-model="emp.job" placeholder="请输入植物" clearable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker v-model="emp.empdate" type="date" placeholder="Pick a date" clearable />
            </el-form-item>
            <el-button type="info" plain @click="deleteemp(index)">删除</el-button>
          </el-form>
            </el-row>
      </el-form>

       
    </el-dialog>


    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入员工姓名" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.gender" placeholder="请选择" clearable>
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="formInline.data" type="daterange" range-separator="到" start-placeholder="开始日期"
          end-placeholder="结束日期" :size="size" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item class="e4">
        <el-button type="primary" @click="select1">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>


  <div class="container">
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

      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button type="info" link plain><el-icon>
              <Delete />
            </el-icon>清空</el-button>
          <el-button type="primary" link plain><el-icon>
              <Edit />
            </el-icon>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>




  <div class="container">
    {{ currentPage4 }}:{{ pageSize4 }}
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
      :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>

</template>

<style>

.demo-form-inline {
  display: flex;
  flex-wrap: nowrap;
  /* 🚫 强制不允许换行 */
  gap: 16px;
  align-items: center;
  width: 100%;
}

.demo-form-inline .el-form-item {
  flex: 1;
  /* 自动撑满剩余空间 */
  min-width: 0;
  /* 🌟 极其关键：防止里面的日期框把外层撑破 */
  margin-right: 0;
  /* 去掉原本的margin-right，靠gap控制 */
  margin-bottom: 0;
  /* 消除底部默认间距 */
  margin-top: 10px;
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


/* 限制上传后图片的尺寸 */
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover; /* 保持比例裁剪，防止拉伸变形 */
}

/* 上传框默认的加号图标尺寸 */
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px; /* 垂直居中 */
  border: 1px dashed var(--el-border-color-dashed); /* 加上虚线边框更好看 */
  border-radius: 6px;
  cursor: pointer;
}
</style>
