<script setup>
import { ref, reactive } from 'vue'
import { login } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router' // 引入 useRouter
const router = useRouter() // 获取 router 实例


const loginFormRef = ref()

// 用 reactive 包住整个表单数据，el-form 的 :model 绑它
const loginForm = reactive({
  username: '',
  password: ''
})

// 校验规则，key 要和 el-form-item 的 prop 一一对应
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}
const login1 = () => {
  // 校验通过才发请求
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    const result = await login(loginForm)
    if (result.code) {
      localStorage.setItem("userInfo",JSON.stringify(result.data))
      ElMessage.success("登陆成功!!")
      router.push("/index")
    }
    else {
      ElMessage.error("账号密码错误")

    }
  })
}


const reset = () => {
  // 依赖 el-form-item 的 prop，把字段恢复成初始值并清掉校验红字
  loginFormRef.value.resetFields()
}
</script>

<template>
  <div class="login-page">
    <el-card class="login-card">
      <h1 class="title">Tlias智能学习辅助系统</h1>
{{ token }}
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="70px" size="large">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>

        <el-form-item>
          <div class="btn-row">
            <el-button type="primary" @click="login1">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #dcdcdf 0%, #c6c6ca 100%);
}

/* 用渐变条纹近似截图里的几何三角背景 */
.login-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(135deg, transparent 49.5%, rgba(255, 255, 255, .4) 50%, transparent 50.5%),
    linear-gradient(45deg, transparent 49.5%, rgba(255, 255, 255, .22) 50%, transparent 50.5%);
  background-size: 220px 220px;
}

.login-card {
  position: relative;
  width: 500px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, .15);
}

.title {
  margin: 8px 0 30px;
  text-align: center;
  font-size: 26px;
  font-style: italic;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 1px;
}

.btn-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-top: 10px;
}

.btn-row .el-button {
  width: 110px;
}
</style>