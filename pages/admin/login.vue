<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="logo-section">
          <div class="logo">💬</div>
          <h1>评论平台管理后台</h1>
          <p class="subtitle">登录您的账号</p>
        </div>
        
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="top" @submit.prevent="handleLogin">
          <n-form-item label="邮箱" path="email">
            <n-input 
              v-model:value="form.email" 
              type="email"
              placeholder="your@email.com"
              size="large"
            />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input 
              v-model:value="form.password" 
              type="password"
              placeholder="请输入密码"
              size="large"
              @keyup.enter="handleLogin"
            />
          </n-form-item>
          <n-button type="primary" block size="large" :loading="loading" @click="handleLogin">
            登录
          </n-button>
        </n-form>
        
        <n-alert v-if="error" type="error" class="mt-4">
          {{ error }}
        </n-alert>
        
        <div class="footer">
          <p>管理员账号：admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const { setToken, setUser } = useAuthStore()
const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

const rules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: form.value.email, password: form.value.password },
    })
    if (res.data?.token) {
      setToken(res.data.token)
      setUser(res.data.user)
      navigateTo('/admin')
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage || e.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}
.login-container {
  width: 100%;
  max-width: 400px;
}
.login-card {
  background: white;
  border-radius: 20px;
  padding: 48px 40px;
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
.footer p {
  color: #999;
  font-size: 12px;
}
</style>
