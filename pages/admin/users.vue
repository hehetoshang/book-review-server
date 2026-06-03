<template>
  <AdminLayout>
    <div class="users-page">
      <div class="page-header">
        <h1 class="page-title">用户管理</h1>
      </div>

      <n-card class="table-card">
        <n-space class="mb-4">
          <n-input v-model:value="search" placeholder="搜索邮箱或昵称" style="width: 240px" />
          <n-button @click="loadUsers">搜索</n-button>
        </n-space>

        <n-data-table
          :columns="columns"
          :data="users"
          :loading="loading"
          :pagination="pagination"
          :row-key="(row: any) => row.id"
          remote
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </n-card>

      <n-modal v-model:show="showEditModal" preset="dialog" :title="editingUser ? '编辑用户' : '查看用户'">
        <template #default>
          <n-form :model="editForm" label-placement="top">
            <n-form-item label="邮箱" :label-width="80">
              <n-input :value="editForm.email" readonly />
            </n-form-item>
            <n-form-item label="昵称" :label-width="80">
              <n-input v-model:value="editForm.nickname" />
            </n-form-item>
            <n-form-item label="角色" :label-width="80">
              <n-select v-model:value="editForm.role" :options="roleOptions" />
            </n-form-item>
            <n-form-item label="状态" :label-width="80">
              <n-switch v-model:value="editForm.isActive" />
              <span>{{ editForm.isActive ? '启用' : '禁用' }}</span>
            </n-form-item>
          </n-form>
        </template>
        <template #action>
          <n-space>
            <n-button @click="showEditModal = false">取消</n-button>
            <n-button type="primary" :loading="updating" @click="handleUpdateUser">
              保存
            </n-button>
          </n-space>
        </template>
      </n-modal>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import {
  NCard, NSpace, NInput, NButton, NDataTable, NModal, NForm, NFormItem, NSelect, NSwitch, useMessage,
  type DataTableColumns,
} from 'naive-ui'
import AdminLayout from '~/components/AdminLayout.vue'

const message = useMessage()
const users = ref<any[]>([])
const loading = ref(false)
const updating = ref(false)
const search = ref('')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)

const showEditModal = ref(false)
const editingUser = ref<any>(null)
const editForm = ref({
  email: '',
  nickname: '',
  role: 'user',
  isActive: true,
})

const roleOptions = [
  { label: '普通用户', value: 'user' },
  { label: '管理员', value: 'admin' },
]

const pagination = computed(() => ({
  page: page.value,
  pageSize: pageSize.value,
  pageCount: Math.ceil(total.value / pageSize.value) || 1,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
}))

const columns: DataTableColumns<any> = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '邮箱', key: 'email', ellipsis: { tooltip: true } },
  { title: '昵称', key: 'nickname' },
  { 
    title: '角色', 
    key: 'role', 
    width: 100,
    render: (row) => row.role === 'admin' ? '管理员' : '用户',
  },
  { 
    title: '状态', 
    key: 'isActive', 
    width: 80,
    render: (row) => row.isActive ? '启用' : '禁用',
  },
  {
    title: '注册时间',
    key: 'createdAt',
    width: 160,
    render: (row) => new Date(row.createdAt).toLocaleString('zh-CN'),
  },
  {
    title: '操作',
    key: 'actions',
    width: 140,
    render: (row) => h('div', { style: 'display:flex;gap:8px;' }, [
      h(NButton, { size: 'small', onClick: () => handleEdit(row) }, { default: () => '编辑' }),
      h(NButton, { size: 'small', type: row.isActive ? 'warning' : 'success', onClick: () => toggleStatus(row) }, { default: () => row.isActive ? '禁用' : '启用' }),
    ]),
  },
]

const loadUsers = async () => {
  loading.value = true
  try {
    const { token } = useAuthStore()
    const params: Record<string, string> = { page: String(page.value), limit: String(pageSize.value) }
    if (search.value) params.search = search.value
    const res: any = await $fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${token.value}` },
      query: params,
    })
    if (res.data) {
      users.value = res.data.list
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
  loadUsers()
}

const handlePageSizeChange = (ps: number) => {
  pageSize.value = ps
  page.value = 1
  loadUsers()
}

const handleEdit = (user: any) => {
  editingUser.value = user
  editForm.value = {
    email: user.email,
    nickname: user.nickname,
    role: user.role,
    isActive: user.isActive,
  }
  showEditModal.value = true
}

const handleUpdateUser = async () => {
  if (!editingUser.value) return
  
  updating.value = true
  try {
    const { token } = useAuthStore()
    await $fetch(`/api/admin/users/${editingUser.value.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        nickname: editForm.value.nickname,
        role: editForm.value.role,
        isActive: editForm.value.isActive,
      },
    })
    message.success('更新成功')
    showEditModal.value = false
    loadUsers()
  } catch (e: any) {
    message.error(e.data?.statusMessage || '更新失败')
  } finally {
    updating.value = false
  }
}

const toggleStatus = async (user: any) => {
  try {
    const { token } = useAuthStore()
    await $fetch(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { isActive: !user.isActive },
    })
    message.success(user.isActive ? '已禁用' : '已启用')
    loadUsers()
  } catch (e: any) {
    message.error(e.data?.statusMessage || '操作失败')
  }
}

onMounted(loadUsers)
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
.table-card {
  border-radius: 16px;
}
.mb-4 {
  margin-bottom: 16px;
}
</style>
