<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-section">
          <div class="logo"></div>
          <h1>评论开放平台</h1>
          <p class="subtitle">登录您的账号</p>
        </div>

        <div class="tabs">
          <button class="tab" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">登录</button>
          <button class="tab" :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">注册</button>
        </div>

        <!-- Login Form -->
        <form v-if="activeTab === 'login'" class="auth-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label>邮箱</label>
            <input v-model="loginForm.email" type="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label>密码</label>
            <input v-model="loginForm.password" type="password" placeholder="请输入密码" required />
          </div>
          <button type="submit" class="btn primary" :disabled="loginLoading">
            {{ loginLoading ? '登录中...' : '登录' }}
          </button>
        </form>

        <!-- Register Form -->
        <form v-else class="auth-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <label>邮箱</label>
            <input v-model="registerForm.email" type="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label>昵称</label>
            <input v-model="registerForm.nickname" type="text" placeholder="请输入昵称" required />
          </div>
          <div class="form-group">
            <label>密码</label>
            <input v-model="registerForm.password" type="password" placeholder="至少6位密码" required minlength="6" />
          </div>
          <button type="submit" class="btn primary" :disabled="registerLoading">
            {{ registerLoading ? '注册中...' : '注册' }}
          </button>
        </form>

        <div v-if="error" class="alert error">{{ error }}</div>

        <div class="footer">
          <a href="/admin/login" class="admin-link">管理员入口</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'blank',
})

const activeTab = ref('login')
const error = ref('')
const loginLoading = ref(false)
const registerLoading = ref(false)

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ email: '', nickname: '', password: '' })

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
      activeTab.value = 'login'
      loginForm.value.email = registerForm.value.email
      loginForm.value.password = ''
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage || '注册失败'
  } finally {
    registerLoading.value = false
  }
}
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
  max-width: 400px;
}
.auth-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
.logo-section {
  text-align: center;
  margin-bottom: 24px;
}
.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  font-size: 28px;
  background: linear-gradient(135deg, #2080f0 0%, #63e2b7 100%);
  border-radius: 16px;
  margin-bottom: 16px;
}
.logo-section h1 {
  font-size: 20px;
  color: #1a1a2e;
  margin: 0 0 4px;
  font-weight: 600;
}
.subtitle {
  color: #999;
  font-size: 13px;
  margin: 0;
}
.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  background: #f0f0f0;
  padding: 4px;
  border-radius: 10px;
}
.tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}
.tab.active {
  background: white;
  color: #1a1a2e;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}
.form-group input {
  padding: 12px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #fafafa;
  color: #1a1a2e;
  font-size: 14px;
  transition: all 0.2s;
}
.form-group input:focus {
  outline: none;
  border-color: #2080f0;
  background: white;
  box-shadow: 0 0 0 3px rgba(32, 128, 240, 0.1);
}
.form-group input::placeholder {
  color: #bbb;
}
.btn {
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.btn.primary {
  background: #2080f0;
  color: white;
}
.btn.primary:hover:not(:disabled) {
  background: #1660c0;
}
.btn.primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.alert {
  margin-top: 16px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
}
.alert.error {
  background: #fef0f0;
  color: #d03050;
}
.footer {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}
.admin-link {
  color: #999;
  font-size: 13px;
  text-decoration: none;
}
.admin-link:hover {
  color: #2080f0;
}
</style>
