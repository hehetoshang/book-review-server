<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-section">
          <div class="logo">💬</div>
          <h1>评论开放平台</h1>
          <p class="subtitle">登录您的账号</p>
        </div>

        <n-tabs v-model:value="activeTab" type="line" justify-content="space-evenly">
          <n-tab-pane name="login" tab="登录">
            <n-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-placement="top">
              <n-form-item label="邮箱" path="email">
                <n-input v-model:value="loginForm.email" type="email" placeholder="your@email.com" size="large" />
              </n-form-item>
              <n-form-item label="密码" path="password">
                <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" size="large" />
              </n-form-item>
              <n-button type="primary" block size="large" :loading="loginLoading" attr-type="submit">
                登录
              </n-button>
            </n-form>
          </n-tab-pane>

          <n-tab-pane name="register" tab="注册">
            <n-form ref="registerFormRef" :model="registerForm" :rules="registerRules" label-placement="top">
              <n-form-item label="邮箱" path="email">
                <n-input v-model:value="registerForm.email" type="email" placeholder="your@email.com" size="large" />
              </n-form-item>
              <n-form-item label="昵称" path="nickname">
                <n-input v-model:value="registerForm.nickname" placeholder="请输入昵称" size="large" />
              </n-form-item>
              <n-form-item label="密码" path="password">
                <n-input v-model:value="registerForm.password" type="password" placeholder="请输入密码（6-50位）" size="large" />
              </n-form-item>
              <n-form-item label="确认密码" path="confirmPassword">
                <n-input v-model:value="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" size="large" />
              </n-form-item>
              <n-button type="primary" block size="large" :loading="registerLoading" attr-type="submit">
                注册
              </n-button>
            </n-form>
          </n-tab-pane>
        </n-tabs>

        <n-alert v-if="error" type="error" class="mt-4">
          {{ error }}
        </n-alert>

        <div class="footer">
          <n-button text @click="navigateTo('/admin/login')">管理员入口</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NTabs, NTabPane, NForm, NFormItem, NInput, NButton, NAlert, useMessage } from 'naive-ui'

definePageMeta({
  layout: 'blank',
})

const message = useMessage()
const activeTab = ref('login')
const error = ref('')
const loginLoading = ref(false)
const registerLoading = ref(false)

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ email: '', nickname: '', password: '', confirmPassword: '' })

const loginRules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
}

const registerRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 50, message: '密码长度需在6-50个字符之间', trigger: 'blur' },
  ],
  confirmPassword: {
    required: true,
    message: '请再次输入密码',
    trigger: 'blur',
    validator: (_rule: any, value: string) => {
      if (value !== registerForm.value.password) {
        return new Error('两次输入的密码不一致')
      }
      return true
    },
  },
}

const handleLogin = async () => {
  loginLoading.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: loginForm.value,
    })
    if (res.data?.token) {
      const authStore = useAuthStore()
      authStore.setToken(res.data.token)
      authStore.setUser(res.data.user)
      message.success('登录成功')
      navigateTo('/dashboard')
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage || '登录失败'
  } finally {
    loginLoading.value = false
  }
}

const handleRegister = async () => {
  registerLoading.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: registerForm.value.email,
        nickname: registerForm.value.nickname,
        password: registerForm.value.password,
      },
    })
    if (res.err === 'ok') {
      message.success('注册成功，请登录')
      activeTab.value = 'login'
      loginForm.value.email = registerForm.value.email
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage || '注册失败'
  } finally {
    registerLoading.value = false
  }
}

// Handle form submit
const handleSubmit = () => {
  if (activeTab.value === 'login') {
    handleLogin()
  } else {
    handleRegister()
  }
}

// Add submit handler to forms
onMounted(() => {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      handleSubmit()
    })
  })
})
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}
.auth-container {
  width: 100%;
  max-width: 420px;
}
.auth-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
.logo-section {
  text-align: center;
  margin-bottom: 32px;
}
.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  font-size: 32px;
  background: linear-gradient(135deg, #2080f0 0%, #63e2b7 100%);
  border-radius: 18px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(32, 128, 240, 0.3);
}
.logo-section h1 {
  font-size: 22px;
  color: #1a1a2e;
  margin-bottom: 8px;
  font-weight: 600;
}
.subtitle {
  color: #666;
  font-size: 14px;
}
.mt-4 {
  margin-top: 16px;
}
.footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}
</style>
