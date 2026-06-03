<template>
  <div class="install-page">
    <div class="install-container">
      <div class="install-card">
        <div class="logo-section">
          <div class="logo">💬</div>
          <h1>评论平台安装向导</h1>
          <p class="subtitle">欢迎使用评论开放平台，请完成以下配置</p>
        </div>

        <n-steps :current="currentStep" class="steps">
          <n-step title="检查环境" />
          <n-step title="管理员设置" />
          <n-step title="完成安装" />
        </n-steps>

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
            <n-button type="primary" block size="large" :loading="checking" :disabled="!dbConnected" @click="currentStep = 2">
              {{ dbConnected ? '下一步' : '检查中...' }}
            </n-button>
          </div>

          <!-- Step 2: 管理员设置 -->
          <div v-if="currentStep === 2" class="step-panel">
            <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
              <n-form-item label="管理员邮箱" path="email">
                <n-input v-model:value="form.email" type="email" placeholder="admin@example.com" />
              </n-form-item>
              <n-form-item label="管理员昵称" path="nickname">
                <n-input v-model:value="form.nickname" placeholder="管理员" />
              </n-form-item>
              <n-form-item label="管理员密码" path="password">
                <n-input v-model:value="form.password" type="password" placeholder="请输入密码（6-50位）" />
              </n-form-item>
              <n-form-item label="确认密码" path="confirmPassword">
                <n-input v-model:value="form.confirmPassword" type="password" placeholder="请再次输入密码" />
              </n-form-item>
              <n-form-item label="站点名称" path="siteName">
                <n-input v-model:value="form.siteName" placeholder="我的评论平台" />
              </n-form-item>
            </n-form>
            <n-space>
              <n-button @click="currentStep = 1">上一步</n-button>
              <n-button type="primary" :loading="installing" @click="handleInstall">
                开始安装
              </n-button>
            </n-space>
          </div>

          <!-- Step 3: 完成安装 -->
          <div v-if="currentStep === 3" class="step-panel success-panel">
            <div class="success-icon">🎉</div>
            <h3>安装完成！</h3>
            <p>您的评论平台已成功安装</p>
            <div class="info-box">
              <p><strong>管理员账号：</strong>{{ form.email }}</p>
              <p><strong>默认应用ID：</strong>{{ appId }}</p>
            </div>
            <n-alert type="warning" class="mt-4">
              请妥善保管您的管理员账号和密码
            </n-alert>
            <n-button type="primary" block size="large" class="mt-4" @click="goToLogin">
              进入管理后台
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NSteps, NStep, NForm, NFormItem, NInput, NButton, NSpace, NAlert, useMessage,
} from 'naive-ui'

definePageMeta({
  layout: 'blank',
})

const message = useMessage()
const currentStep = ref(1)
const checking = ref(true)
const checked = ref(false)
const installing = ref(false)
const dbConnected = ref(false)
const appId = ref('')

const form = ref({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  siteName: '',
})

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

const checkEnvironment = async () => {
  checking.value = true
  try {
    const res: any = await $fetch('/api/install/status')
    checked.value = true
    
    if (res.data?.isInstalled) {
      // Already installed, redirect to home
      message.info('系统已安装，正在跳转...')
      setTimeout(() => navigateTo('/'), 500)
      return
    }
    
    dbConnected.value = true
  } catch {
    checked.value = true
    message.error('数据库连接失败，请检查配置')
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
    message.error(e.data?.statusMessage || '安装失败')
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
.steps {
  margin-bottom: 32px;
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
</style>
