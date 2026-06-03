<template>
  <div class="install-page">
    <div class="install-container">
      <v-card class="install-card" elevation="4">
        <v-card-text class="pa-8">
          <div class="logo-section">
            <div class="logo">&#128172;</div>
            <h1>评论平台安装向导</h1>
            <p class="subtitle">欢迎使用评论开放平台，请完成以下配置</p>
          </div>

          <v-progress-linear
            :model-value="progressValue"
            color="primary"
            height="4"
            class="mb-6"
            rounded
          >
            <div class="steps-labels">
              <span :class="{ active: currentStep === 1, done: currentStep > 1 }">检查环境</span>
              <span :class="{ active: currentStep === 2, done: currentStep > 2 }">管理员设置</span>
              <span :class="{ active: currentStep === 3 }">完成安装</span>
            </div>
          </v-progress-linear>

          <div class="step-content">
            <!-- Step 1: 环境检查 -->
            <div v-if="currentStep === 1" class="step-panel">
              <h3>环境检查</h3>
              <div class="check-list">
                <div class="check-item" :class="{ success: dbConnected, error: !dbConnected && checked }">
                  <span class="icon">{{ dbConnected ? '✓' : (checked ? '✗' : '...') }}</span>
                  <span>数据库连接</span>
                </div>
                <div class="check-item success">
                  <span class="icon">✓</span>
                  <span>运行环境</span>
                </div>
              </div>
              <v-btn
                color="primary"
                block
                size="x-large"
                :loading="checking"
                :disabled="!dbConnected"
                @click="currentStep = 2"
              >
                {{ dbConnected ? '下一步' : '检查中...' }}
              </v-btn>
            </div>

            <!-- Step 2: 管理员设置 -->
            <div v-if="currentStep === 2" class="step-panel">
              <v-form ref="formRef" v-model="formValid">
                <v-text-field
                  v-model="form.email"
                  label="管理员邮箱"
                  type="email"
                  placeholder="admin@example.com"
                  variant="outlined"
                  :rules="emailRules"
                />
                <v-text-field
                  v-model="form.nickname"
                  label="管理员昵称"
                  placeholder="管理员"
                  variant="outlined"
                  :rules="[v => !!v || '请输入昵称']"
                />
                <v-text-field
                  v-model="form.password"
                  label="管理员密码"
                  type="password"
                  placeholder="请输入密码（6-50位）"
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
                <v-text-field
                  v-model="form.siteName"
                  label="站点名称"
                  placeholder="我的评论平台"
                  variant="outlined"
                />
              </v-form>
              <v-row class="mt-4">
                <v-col cols="auto">
                  <v-btn @click="currentStep = 1">上一步</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn color="primary" :loading="installing" @click="handleInstall">
                    开始安装
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <!-- Step 3: 完成安装 -->
            <div v-if="currentStep === 3" class="step-panel success-panel">
              <div class="success-icon">&#127881;</div>
              <h3>安装完成！</h3>
              <p>您的评论平台已成功安装</p>
              <div class="info-box">
                <p><strong>管理员账号：</strong>{{ form.email }}</p>
                <p><strong>默认应用ID：</strong>{{ appId }}</p>
              </div>
              <v-alert type="warning" variant="tonal" class="mt-4">
                请妥善保管您的管理员账号和密码
              </v-alert>
              <v-btn
                color="primary"
                block
                size="x-large"
                class="mt-4"
                @click="goToLogin"
              >
                进入管理后台
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'blank',
})

const currentStep = ref(1)
const checking = ref(true)
const checked = ref(false)
const installing = ref(false)
const dbConnected = ref(false)
const appId = ref('')
const formValid = ref(false)

const form = ref({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  siteName: '',
})

const formRef = ref()

const emailRules = [
  (v: string) => !!v || '请输入邮箱',
  (v: string) => /.+@.+\..+/.test(v) || '请输入正确的邮箱格式',
]
const passwordRules = [
  (v: string) => !!v || '请输入密码',
  (v: string) => (v.length >= 6 && v.length <= 50) || '密码长度需在6-50个字符之间',
]

const progressValue = computed(() => {
  return ((currentStep.value - 1) / 2) * 100
})

const showToast = (msg: string, type: 'info' | 'error' = 'info') => {
  // Simple alert-based toast since useMessage is from naive-ui
  if (import.meta.client) {
    alert(msg)
  }
}

const checkEnvironment = async () => {
  checking.value = true
  try {
    const res: any = await $fetch('/api/install/status')
    checked.value = true
    
    if (res.data?.isInstalled) {
      // Already installed, redirect to home
      showToast('系统已安装，正在跳转...', 'info')
      setTimeout(() => navigateTo('/'), 500)
      return
    }
    
    dbConnected.value = true
  } catch {
    checked.value = true
    showToast('数据库连接失败，请检查配置', 'error')
  } finally {
    checking.value = false
  }
}

const handleInstall = async () => {
  installing.value = true
  try {
    const res: any = await $fetch('/api/install/setup', {
      method: 'POST',
      body: form.value,
    })
    if (res.data) {
      appId.value = res.data.app?.appId || ''
      currentStep.value = 3
      // Mark as installed in localStorage to prevent redirect loops
      if (import.meta.client) {
        localStorage.setItem('platform_installed', 'true')
      }
    }
  } catch (e: any) {
    showToast(e.data?.statusMessage || '安装失败', 'error')
  } finally {
    installing.value = false
  }
}

const goToLogin = () => {
  navigateTo('/admin/login')
}

// Initial check
onMounted(() => {
  checkEnvironment()
})
</script>

<style scoped>
.install-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}
.install-container {
  width: 100%;
  max-width: 560px;
}
.install-card {
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
.steps-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  font-size: 12px;
  color: #999;
}
.steps-labels span.active {
  color: #1976d2;
  font-weight: 600;
}
.steps-labels span.done {
  color: #4caf50;
}
.step-content {
  min-height: 280px;
}
.step-panel {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.step-panel h3 {
  font-size: 18px;
  color: #1a1a2e;
  margin-bottom: 20px;
}
.check-list {
  margin-bottom: 24px;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 8px;
}
.check-item.success {
  color: #18a058;
}
.check-item.error {
  color: #d03050;
}
.check-item .icon {
  font-size: 16px;
  font-weight: bold;
}
.success-panel {
  text-align: center;
}
.success-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
.info-box {
  background: #fafafa;
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  margin: 16px 0;
}
.info-box p {
  margin: 8px 0;
  font-size: 14px;
}
.mt-4 {
  margin-top: 16px;
}
.mb-6 {
  margin-bottom: 24px;
}
</style>
