<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <div class="logo-section">
          <div class="logo">💬</div>
          <h1>评论开放平台</h1>
          <p class="subtitle">创建您的账号</p>
        </div>

        <n-form ref="formRef" :model="form" :rules="rules" label-placement="top" @submit.prevent="handleRegister">
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="form.email" type="email" placeholder="your@email.com" size="large" />
          </n-form-item>
          <n-form-item label="昵称" path="nickname">
            <n-input v-model:value="form.nickname" placeholder="请输入昵称" size="large" />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input v-model:value="form.password" type="password" placeholder="至少6位密码" size="large" />
          </n-form-item>
          <n-form-item label="确认密码" path="confirmPassword">
            <n-input v-model:value="form.confirmPassword" type="password" placeholder="请再次输入密码" size="large" />
          </n-form-item>
          <div v-if="error" class="error-msg">{{ error }}</div>
          <n-button type="primary" block size="large" :loading="loading" @click="handleRegister">
            注册
          </n-button>
        </n-form>

        <div class="footer">
          <p>已有账号？<a href="/login">立即登录</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'

definePageMeta({
  layout: 'blank',
})

const formRef = ref()
const form = ref({ email: '', nickname: '', password: '', confirmPassword: '' })
const loading = ref(false)
const error = ref('')

const rules = {
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
      if (value !== form.value.password) {
        return new Error('两次输入的密码不一致')
      }
      return true
    },
  },
}

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: form.value.email,
        nickname: form.value.nickname,
        password: form.value.password,
      },
    })
    if (res.err === 'ok') {
      navigateTo('/login?registered=1')
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage || '注册失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}
.register-container {
  width: 100%;
  max-width: 400px;
}
.register-card {
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
.error-msg {
  padding: 10px 12px;
  background: rgba(208, 48, 80, 0.1);
  color: #d03050;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 16px;
}
.footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}
.footer p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
.footer a {
  color: #2080f0;
  text-decoration: none;
}
.footer a:hover {
  text-decoration: underline;
}
</style>
