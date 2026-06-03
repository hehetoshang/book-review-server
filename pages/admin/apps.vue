<template>
  <AdminLayout>
    <div class="apps-page">
      <div class="page-header">
        <h1 class="page-title">应用管理</h1>
        <v-btn color="primary" @click="showCreateModal = true">
          创建应用
        </v-btn>
      </div>

      <v-card class="table-card" variant="outlined">
        <v-card-text>
          <v-row class="mb-4" align="center">
            <v-col cols="auto">
              <v-text-field
                v-model="search"
                placeholder="搜索应用名称或ID"
                density="compact"
                variant="outlined"
                hide-details
                style="max-width: 240px"
                @keyup.enter="loadApps"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn @click="loadApps">搜索</v-btn>
            </v-col>
          </v-row>

          <v-data-table-server
            :headers="headers"
            :items="apps"
            :loading="loading"
            :items-length="total"
            :items-per-page="pageSize"
            :page="page"
            :items-per-page-options="[10, 20, 50]"
            @update:options="handleOptionsChange"
          >
            <template v-slot:item._count="{ item }">
              {{ item._count?.comments || 0 }}
            </template>
            <template v-slot:item.isActive="{ item }">
              <v-chip :color="item.isActive ? 'success' : 'grey'" size="small" variant="flat">
                {{ item.isActive ? '启用' : '禁用' }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="action-buttons">
                <v-btn size="small" variant="text" @click="navigateTo(`/admin/apps/${item.id}`)">
                  详情
                </v-btn>
                <v-btn
                  size="small"
                  variant="text"
                  :color="item.isActive ? 'warning' : 'success'"
                  @click="toggleStatus(item)"
                >
                  {{ item.isActive ? '禁用' : '启用' }}
                </v-btn>
              </div>
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>

      <v-dialog v-model="showCreateModal" max-width="500">
        <v-card>
          <v-card-title>创建应用</v-card-title>
          <v-card-text>
            <v-form ref="createFormRef">
              <v-text-field
                v-model="createForm.name"
                label="应用名称"
                variant="outlined"
                :rules="[v => !!v || '请输入应用名称']"
              />
              <v-text-field
                v-model="createForm.domains"
                label="允许域名"
                placeholder="多个域名用逗号分隔"
                variant="outlined"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="showCreateModal = false">取消</v-btn>
            <v-btn color="primary" :loading="creating" @click="handleCreateApp">
              创建
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showCredentialsModal" max-width="500">
        <v-card>
          <v-card-title>应用创建成功</v-card-title>
          <v-card-text>
            <v-alert type="success" variant="tonal" class="mb-4">
              请妥善保管以下凭证。
            </v-alert>
            <v-text-field
              label="App ID"
              :value="newApp?.appId"
              variant="outlined"
              readonly
            >
              <template v-slot:append>
                <v-btn variant="text" size="small" @click="copyText(newApp?.appId)">复制</v-btn>
              </template>
            </v-text-field>
            <v-text-field
              label="Secret"
              :value="newApp?.secret"
              type="password"
              variant="outlined"
              readonly
            >
              <template v-slot:append>
                <v-btn variant="text" size="small" @click="copyText(newApp?.secret)">复制</v-btn>
              </template>
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="showCredentialsModal = false">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '~/components/AdminLayout.vue'

const apps = ref<any[]>([])
const loading = ref(false)
const search = ref('')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)

const showCreateModal = ref(false)
const showCredentialsModal = ref(false)
const creating = ref(false)
const createForm = ref({ name: '', domains: '' })
const newApp = ref<any>(null)

const headers = [
  { title: 'App ID', key: 'appId', width: 180 },
  { title: '应用名称', key: 'name' },
  { title: '域名', key: 'domains' },
  { title: '评论数', key: '_count', width: 100 },
  { title: '状态', key: 'isActive', width: 100 },
  { title: '操作', key: 'actions', width: 140, sortable: false },
]

const handleOptionsChange = (options: any) => {
  page.value = options.page
  pageSize.value = options.itemsPerPage
  loadApps()
}

const loadApps = async () => {
  loading.value = true
  try {
    const { token } = useAuthStore()
    const params: Record<string, string> = { page: String(page.value), limit: String(pageSize.value) }
    if (search.value) params.search = search.value
    const res: any = await $fetch('/api/admin/apps', {
      headers: { Authorization: `Bearer ${token.value}` },
      query: params,
    })
    if (res.data) {
      apps.value = res.data.list
      total.value = res.data.pagination.total
    }
  } catch (e: any) {
    if (import.meta.client) {
      alert(e.data?.statusMessage || '加载失败')
    }
  } finally {
    loading.value = false
  }
}

const handleCreateApp = async () => {
  if (!createForm.value.name) return
  creating.value = true
  try {
    const { token } = useAuthStore()
    const res: any = await $fetch('/api/admin/apps', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { name: createForm.value.name, domains: createForm.value.domains },
    })
    if (res.data) {
      newApp.value = res.data
      showCreateModal.value = false
      showCredentialsModal.value = true
      createForm.value = { name: '', domains: '' }
      loadApps()
    }
  } catch (e: any) {
    if (import.meta.client) {
      alert(e.data?.statusMessage || '创建失败')
    }
  } finally {
    creating.value = false
  }
}

const toggleStatus = async (row: any) => {
  try {
    const { token } = useAuthStore()
    await $fetch(`/api/admin/apps/${row.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { isActive: !row.isActive },
    })
    if (import.meta.client) {
      alert(row.isActive ? '已禁用' : '已启用')
    }
    loadApps()
  } catch (e: any) {
    if (import.meta.client) {
      alert(e.data?.statusMessage || '操作失败')
    }
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

onMounted(loadApps)
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}
.table-card {
  border-radius: 16px;
}
.action-buttons {
  display: flex;
  gap: 4px;
}
</style>
