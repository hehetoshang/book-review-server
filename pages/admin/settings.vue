<template>
  <AdminLayout>
    <div class="settings-page">
      <div class="page-header">
        <h1 class="page-title">个人设置</h1>
      </div>

      <n-card title="账户信息" class="info-card">
        <n-descriptions :column="1">
          <n-descriptions-item label="邮箱">
            {{ authStore.user?.email }}
          </n-descriptions-item>
          <n-descriptions-item label="角色">
            {{ authStore.user?.role === 'admin' ? '管理员' : '用户' }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>

      <n-card title="修改密码" class="password-card">
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
          <n-form-item label="当前密码" path="currentPassword">
            <n-input v-model:value="form.currentPassword" type="password" placeholder="请输入当前密码" />
          </n-form-item>
          <n-form-item label="新密码" path="newPassword">
            <n-input v-model:value="form.newPassword" type="password" placeholder="请输入新密码（6-50位）" />
          </n-form-item>
          <n-form-item label="确认新密码" path="confirmPassword">
            <n-input v-model:value="form.confirmPassword" type="password" placeholder="请再次输入新密码" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" :loading="loading" @click="handleChangePassword">
              修改密码
            </n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NForm, NFormItem, NInput, NButton, NDescriptions, NDescriptionsItem, useMessage } from 'naive-ui'
import AdminLayout from '~/components/AdminLayout.vue'

const authStore = useAuthStore()
const message = useMessage()
const loading = ref(false)
const form = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })

const rules = {
  currentPassword: { required: true, message: '请输入当前密码', trigger: 'blur' },
  newPassword: { required: true, message: '请输入新密码', trigger: 'blur' },
  confirmPassword: {
    required: true,
    message: '请再次输入新密码',
    trigger: 'blur',
    validator: (_rule: any, value: string) => {
      if (value !== form.value.newPassword) {
        return new Error('两次输入的密码不一致')
      }
      return true
    },
  },
}

const handleChangePassword = async () => {
  loading.value = true
  try {
    const { token } = authStore
    await $fetch('/api/auth/password', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        currentPassword: form.value.currentPassword,
        newPassword: form.value.newPassword,
      },
    })
    message.success('密码修改成功')
    form.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (e: any) {
    message.error(e.data?.statusMessage || '修改失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}
.info-card,
.password-card {
  border-radius: 16px;
  margin-bottom: 20px;
}
</style>
