<template>
  <AdminLayout>
    <div class="apps-page">
      <div class="page-header">
        <h1 class="page-title">应用管理</h1>
        <n-button type="primary" @click="showCreateModal = true">
          创建应用
        </n-button>
      </div>

      <n-card class="table-card">
        <n-space class="mb-4">
          <n-input v-model:value="search" placeholder="搜索应用名称或ID" style="width: 240px" @keyup.enter="loadApps" />
          <n-button @click="loadApps">搜索</n-button>
        </n-space>

        <n-data-table
          :columns="columns"
          :data="apps"
          :loading="loading"
          :pagination="pagination"
          :row-key="(row: any) => row.id"
          remote
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </n-card>

      <n-modal v-model:show="showCreateModal" preset="dialog" title="创建应用">
        <template #default>
          <n-form ref="createFormRef" :model="createForm" :rules="createRules">
            <n-form-item label="应用名称" path="name">
              <n-input v-model:value="createForm.name" placeholder="请输入应用名称" />
            </n-form-item>
            <n-form-item label="允许域名" path="domains">
              <n-input v-model:value="createForm.domains" placeholder="多个域名用逗号分隔" />
            </n-form-item>
          </n-form>
        </template>
        <template #action>
          <n-space>
            <n-button @click="showCreateModal = false">取消</n-button>
            <n-button type="primary" :loading="creating" @click="handleCreateApp">
              创建
            </n-button>
          </n-space>
        </template>
      </n-modal>

      <n-modal v-model:show="showCredentialsModal" preset="dialog" title="应用创建成功">
        <template #default>
          <n-alert type="success" class="mb-4">
            请妥善保管以下凭证。
          </n-alert>
          <n-form>
            <n-form-item label="App ID">
              <n-input :value="newApp?.appId" readonly>
                <template #suffix>
                  <n-button text @click="copyText(newApp?.appId)">复制</n-button>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="Secret">
              <n-input :value="newApp?.secret" readonly type="password" show-password-on="click">
                <template #suffix>
                  <n-button text @click="copyText(newApp?.secret)">复制</n-button>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
        </template>
        <template #action>
          <n-button type="primary" @click="showCredentialsModal = false">确定</n-button>
        </template>
      </n-modal>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import {
  NCard, NSpace, NButton, NInput, NDataTable, NModal, NForm, NFormItem, NAlert, useMessage,
  type DataTableColumns,
} from 'naive-ui'
import AdminLayout from '~/components/AdminLayout.vue'

const message = useMessage()
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

const createRules = {
  name: { required: true, message: '请输入应用名称', trigger: 'blur' },
}

const pagination = computed(() => ({
  page: page.value,
  pageSize: pageSize.value,
  pageCount: Math.ceil(total.value / pageSize.value) || 1,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
}))

const columns: DataTableColumns<any> = [
  { title: 'App ID', key: 'appId', width: 180, ellipsis: { tooltip: true } },
  { title: '应用名称', key: 'name' },
  { title: '域名', key: 'domains', ellipsis: { tooltip: true } },
  { title: '评论数', key: '_count', width: 100, render: (row) => row._count?.comments || 0 },
  { 
    title: '状态', 
    key: 'isActive', 
    width: 80,
    render: (row) => row.isActive ? '启用' : '禁用',
  },
  {
    title: '操作',
    key: 'actions',
    width: 140,
    render: (row) => h('div', { style: 'display:flex;gap:8px;' }, [
      h(NButton, { size: 'small', onClick: () => navigateTo(`/admin/apps/${row.id}`) }, { default: () => '详情' }),
      h(NButton, { size: 'small', type: row.isActive ? 'warning' : 'success', onClick: () => toggleStatus(row) }, { default: () => row.isActive ? '禁用' : '启用' }),
    ]),
  },
]

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
    message.error(e.data?.statusMessage || '加载失败')
  } finally {
    loading.value = false
  }
}

const handlePageChange = (p: number) => {
  page.value = p
  loadApps()
}

const handlePageSizeChange = (ps: number) => {
  pageSize.value = ps
  page.value = 1
  loadApps()
}

const handleCreateApp = async () => {
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
    message.error(e.data?.statusMessage || '创建失败')
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
    message.success(row.isActive ? '已禁用' : '已启用')
    loadApps()
  } catch (e: any) {
    message.error(e.data?.statusMessage || '操作失败')
  }
}

const copyText = (text?: string) => {
  if (text && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => message.success('已复制'))
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
.mb-4 {
  margin-bottom: 16px;
}
</style>
