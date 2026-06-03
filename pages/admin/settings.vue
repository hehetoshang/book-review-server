<template>
  <AdminLayout>
    <div class="settings-page">
      <div class="page-header">
        <h1 class="page-title">个人设置</h1>
      </div>

      <v-card class="info-card" variant="outlined">
        <template v-slot:title>
          <span class="card-title">账户信息</span>
        </template>
        <v-card-text>
          <v-list lines="two" density="compact">
            <v-list-item title="邮箱" :subtitle="authStore.user?.email" />
            <v-list-item title="角色" :subtitle="authStore.user?.role === 'admin' ? '管理员' : '用户'" />
          </v-list>
        </v-card-text>
      </v-card>

      <v-card class="password-card" variant="outlined">
        <template v-slot:title>
          <span class="card-title">修改密码</span>
        </template>
        <v-card-text>
          <v-form ref="formRef" v-model="formValid" @submit.prevent="handleChangePassword">
            <v-text-field
              v-model="form.currentPassword"
              label="当前密码"
              type="password"
              placeholder="请输入当前密码"
              variant="outlined"
              :rules="[v => !!v || '请输入当前密码']"
            />
            <v-text-field
              v-model="form.newPassword"
              label="新密码"
              type="password"
              placeholder="请输入新密码（6-50位）"
              variant="outlined"
              :rules="[v => !!v || '请输入新密码', v => (v.length >= 6 && v.length <= 50) || '密码长度需在6-50个字符之间']"
            />
            <v-text-field
              v-model="form.confirmPassword"
              label="确认新密码"
              type="password"
              placeholder="请再次输入新密码"
              variant="outlined"
              :rules="[v => !!v || '请再次输入新密码', v => v === form.newPassword || '两次输入的密码不一致']"
            />
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              修改密码
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '~/components/AdminLayout.vue'

const authStore = useAuthStore()
const formRef = ref()
const formValid = ref(false)
const loading = ref(false)
const form = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })

const handleChangePassword = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

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
    if (import.meta.client) {
      alert('密码修改成功')
    }
    form.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (e: any) {
    if (import.meta.client) {
      alert(e.data?.statusMessage || '修改失败')
    }
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
.card-title {
  font-weight: 600;
}
</style>
