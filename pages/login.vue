<template>
  <div class="login-page">
    <div class="login-container">
      <v-card class="login-card" elevation="2">
        <v-card-item class="logo-section">
          <v-avatar size="64" class="logo mx-auto mb-3" color="primary">
            <v-icon size="32" icon="mdi-message-text" color="white" />
          </v-avatar>
          <v-card-title class="text-h6 text-center">评论开放平台</v-card-title>
          <v-card-subtitle class="text-center">登录您的账号</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-alert v-if="error" type="error" variant="tonal" class="mb-4" density="compact">
            {{ error }}
          </v-alert>

          <v-form>
            <v-text-field
              v-model="form.account"
              label="邮箱或用户名"
              placeholder="your@email.com 或用户名"
              prepend-inner-icon="mdi-account"
              required
              @keyup.enter="handleLogin"
            />
            <v-text-field
              v-model="form.password"
              label="密码"
              type="password"
              placeholder="请输入密码"
              prepend-inner-icon="mdi-lock"
              required
              @keyup.enter="handleLogin"
            />
            <v-btn
              color="primary"
              block
              size="large"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </v-btn>
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions class="flex-column">
          <p class="text-body-2 text-medium-emphasis mb-1">
            还没有账号？<a href="/register" class="text-primary text-decoration-none">立即注册</a>
          </p>
          <p class="text-body-2 text-medium-emphasis">
            <a href="/admin/login" class="text-primary text-decoration-none">管理员入口</a>
          </p>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const form = ref({ account: '', password: '' })
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { account: form.value.account, password: form.value.password },
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
  max-width: 420px;
}
.login-card {
  border-radius: 16px;
}
.logo {
  background: linear-gradient(135deg, #2080f0 0%, #63e2b7 100%);
}
</style>
