<template>
  <AdminLayout>
    <div class="app-detail" v-if="app">
      <div class="page-header">
        <n-button @click="handleBack">返回</n-button>
        <h1 class="page-title">应用详情</h1>
      </div>

      <n-card title="基本信息" class="detail-card">
        <n-form label-placement="left" label-width="100">
          <n-form-item label="App ID">
            <n-input :value="app.appId" readonly>
              <template #suffix>
                <n-button text @click="copyText(app.appId)">复制</n-button>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="应用名称">
            <n-input v-model:value="editForm.name" />
          </n-form-item>
          <n-form-item label="允许域名">
            <n-input v-model:value="editForm.domains" placeholder="多个域名用逗号分隔" />
          </n-form-item>
          <n-form-item label="状态">
            <n-switch v-model:value="editForm.isActive" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" :loading="updating" @click="handleUpdate">保存</n-button>
          </n-form-item>
        </n-form>
      </n-card>

      <n-card title="API 密钥" class="detail-card">
        <n-alert type="warning" class="mb-4">
          Secret 用于签名代理登录 Token，请妥善保管，切勿泄露。
        </n-alert>
        <n-form label-placement="left" label-width="100">
          <n-form-item label="Secret">
            <n-input :value="secret" type="password" show-password-on="click" readonly>
              <template #suffix>
                <n-button text @click="copyText(secret)">复制</n-button>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button type="warning" :loading="resetting" @click="handleResetSecret">
              重置 Secret
            </n-button>
          </n-form-item>
        </n-form>
      </n-card>

      <n-card title="统计信息" class="detail-card">
        <n-descriptions :column="2">
          <n-descriptions-item label="评论总数">
            {{ app._count?.comments || 0 }}
          </n-descriptions-item>
          <n-descriptions-item label="创建时间">
            {{ new Date(app.createdAt).toLocaleString('zh-CN') }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NForm, NFormItem, NInput, NButton, NSwitch, NDescriptions, NDescriptionsItem, NAlert, useMessage } from 'naive-ui'
import AdminLayout from '~/components/AdminLayout.vue'

const route = useRoute()
const message = useMessage()
const app = ref<any>(null)
const secret = ref('')
const editForm = ref({ name: '', domains: '', isActive: true })
const updating = ref(false)
const resetting = ref(false)

const loadApp = async () => {
  try {
    const { token } = useAuthStore()
    const id = route.params.id as string
    const [appRes, secretRes]: [any, any] = await Promise.all([
      $fetch(`/api/admin/apps/${id}`, { headers: { Authorization: `Bearer ${token.value}` } }),
      $fetch(`/api/admin/apps/${id}/secret`, { headers: { Authorization: `Bearer ${token.value}` } }),
    ])
    if (appRes.data) {
      app.value = appRes.data
      editForm.value = {
        name: appRes.data.name,
        domains: appRes.data.domains,
        isActive: appRes.data.isActive,
      }
    }
    if (secretRes.data) {
      secret.value = secretRes.data.secret
    }
  } catch (e: any) {
    message.error(e.data?.statusMessage || '加载失败')
  }
}

const handleUpdate = async () => {
  updating.value = true
  try {
    const { token } = useAuthStore()
    await $fetch(`/api/admin/apps/${route.params.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: editForm.value,
    })
    message.success('更新成功')
    loadApp()
  } catch (e: any) {
    message.error(e.data?.statusMessage || '更新失败')
  } finally {
    updating.value = false
  }
}

const handleResetSecret = async () => {
  resetting.value = true
  try {
    const { token } = useAuthStore()
    const res: any = await $fetch(`/api/admin/apps/${route.params.id}/reset-secret`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (res.data) {
      secret.value = res.data.secret
      message.success('Secret 已重置')
    }
  } catch (e: any) {
    message.error(e.data?.statusMessage || '重置失败')
  } finally {
    resetting.value = false
  }
}

const copyText = (text?: string) => {
  if (text && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => message.success('已复制'))
  }
}

const handleBack = () => {
  navigateTo('/admin/apps')
}

onMounted(loadApp)
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}
.detail-card {
  border-radius: 16px;
  margin-bottom: 20px;
}
.mb-4 {
  margin-bottom: 16px;
}
</style>
