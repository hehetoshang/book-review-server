<template>
  <div class="register-page">
    <div class="register-container">
      <v-card class="register-card" elevation="4">
        <v-card-text class="pa-8">
          <div class="logo-section">
            <div class="logo">&#128172;</div>
            <h1>评论开放平台</h1>
            <p class="subtitle">创建您的账号</p>
          </div>

          <v-form ref="formRef" v-model="formValid">
            <v-text-field
              v-model="form.username"
              label="用户名"
              placeholder="请输入用户名（字母数字下划线）"
              variant="outlined"
              :rules="usernameRules"
            />
            <v-text-field
              v-model="form.email"
              label="邮箱"
              type="email"
              placeholder="your@email.com"
              variant="outlined"
              :rules="emailRules"
            />
            <v-text-field
              v-model="form.nickname"
              label="昵称"
              placeholder="请输入昵称"
              variant="outlined"
              :rules="[v => !!v || '请输入昵称']"
            />
            <v-text-field
              v-model="form.password"
              label="密码"
              type="password"
              placeholder="至少6位密码"
              variant="outlined"
              :rules="passwordRules"
            />
            <v-text-field
              v-model="form.confirmPassword"
              label="确认密码"
              type="password"
              placeholder="请再次输入密码"
              variant="outlined"
              :rules="[v => !!v || '请再次输入密码', v => v === form.password || '两次输入的密码不一致']"
            />
            <v-alert v-if="error" type="error" variant="tonal" class="mb-4" density="compact">
              {{ error }}
            </v-alert>
            <v-btn
              color="primary"
              block
              size="x-large"
              :loading="loading"
              @click="handleRegister"
            >
              注册
            </v-btn>
          </v-form>

          <div class="footer">
            <p>已有账号？<a href="/login">立即登录</a></p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'blank',
})

const formRef = ref()
const formValid = ref(false)
const form = ref({ username: '', email: '', nickname: '', password: '', confirmPassword: '' })
const loading = ref(false)
const error = ref('')

const usernameRules = [
  (v: string) => !!v || '请输入用户名',
  (v: string) => /^[a-zA-Z0-9_]{2,20}$/.test(v) || '用户名只能包含字母、数字和下划线，长度2-20位',
]
const emailRules = [
  (v: string) => !!v || '请输入邮箱',
  (v: string) => /.+@.+\..+/.test(v) || '请输入正确的邮箱格式',
]
const passwordRules = [
  (v: string) => !!v || '请输入密码',
  (v: string) => (v.length >= 6 && v.length <= 50) || '密码长度需在6-50个字符之间',
]

const handleRegister = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: form.value.username,
        email: form.value.email,
        nickname: form.value.nickname,
        password: form.value.password,
      },
    })
    if (res.err === 'ok') {
      navigateTo('/login?registered=1')
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage || e.data?.message || '注册失败'
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
  border-radius: 20px;
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
