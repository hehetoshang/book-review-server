<template>
  <AdminLayout>
    <div class="app-detail" v-if="app">
      <div class="page-header">
        <v-btn variant="text" @click="handleBack">返回</v-btn>
        <h1 class="page-title">应用详情</h1>
      </div>

      <v-card class="detail-card" variant="outlined">
        <template v-slot:title>
          <span class="card-title">基本信息</span>
        </template>
        <v-card-text>
          <v-form>
            <v-text-field
              label="App ID"
              :value="app.appId"
              variant="outlined"
              readonly
            >
              <template v-slot:append>
                <v-btn variant="text" size="small" @click="copyText(app.appId)">复制</v-btn>
              </template>
            </v-text-field>
            <v-text-field
              v-model="editForm.name"
              label="应用名称"
              variant="outlined"
            />
            <v-text-field
              v-model="editForm.domains"
              label="允许域名"
              placeholder="多个域名用逗号分隔"
              variant="outlined"
            />
            <v-switch
              v-model="editForm.isActive"
              label="状态"
              :true-value="true"
              :false-value="false"
            />
            <v-btn
              color="primary"
              :loading="updating"
              @click="handleUpdate"
            >
              保存
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card class="detail-card" variant="outlined">
        <template v-slot:title>
          <span class="card-title">API 密钥</span>
        </template>
        <v-card-text>
          <v-alert type="warning" variant="tonal" class="mb-4">
            Secret 用于签名代理登录 Token，请妥善保管，切勿泄露。
          </v-alert>
          <v-form>
            <v-text-field
              label="Secret"
              :value="secret"
              type="password"
              variant="outlined"
              readonly
            >
              <template v-slot:append>
                <v-btn variant="text" size="small" @click="copyText(secret)">复制</v-btn>
              </template>
            </v-text-field>
            <v-btn
              color="warning"
              :loading="resetting"
              @click="handleResetSecret"
            >
              重置 Secret
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card class="detail-card" variant="outlined">
        <template v-slot:title>
          <span class="card-title">统计信息</span>
        </template>
        <v-card-text>
          <v-table density="compact">
            <tbody>
              <tr>
                <td class="stat-label">评论总数</td>
                <td>{{ app._count?.comments || 0 }}</td>
              </tr>
              <tr>
                <td class="stat-label">创建时间</td>
                <td>{{ new Date(app.createdAt).toLocaleString('zh-CN') }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '~/components/AdminLayout.vue'

const route = useRoute()
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
    if (import.meta.client) {
      alert(e.data?.statusMessage || '加载失败')
    }
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
    if (import.meta.client) {
      alert('更新成功')
    }
    loadApp()
  } catch (e: any) {
    if (import.meta.client) {
      alert(e.data?.statusMessage || '更新失败')
    }
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
      if (import.meta.client) {
        alert('Secret 已重置')
      }
    }
  } catch (e: any) {
    if (import.meta.client) {
      alert(e.data?.statusMessage || '重置失败')
    }
  } finally {
    resetting.value = false
  }
}

const copyText = (text?: string) => {
  if (text && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (import.meta.client) {
        alert('已复制')
      }
    })
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
.card-title {
  font-weight: 600;
}
.mb-4 {
  margin-bottom: 16px;
}
.stat-label {
  font-weight: 600;
  width: 120px;
  color: #666;
}
</style>
