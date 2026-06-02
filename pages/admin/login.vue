<template>
  <div class="login-page">
    <n-card class="login-card" :bordered="false">
      <h1 class="login-title">评论平台管理后台</h1>
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="form.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="form.password" type="password" placeholder="请输入密码" />
        </n-form-item>
        <n-button type="primary" block size="large" :loading="loading" @click="handleLogin">
          登录
        </n-button>
      </n-form>
      <n-alert v-if="error" type="error" closable class="mt-4">
        {{ error }}
      </n-alert>
    </n-card>
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
  background: #f0f2f5;
}
.login-card {
  width: 400px;
}
.login-title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
}
.mt-4 {
  margin-top: 16px;
}
</style>
