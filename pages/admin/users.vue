<template>
  <AdminLayout>
    <div class="users-page">
      <div class="page-header">
        <h1 class="page-title">用户管理</h1>
      </div>

      <v-card class="table-card" variant="outlined">
        <v-card-text>
          <v-row class="mb-4" align="center">
            <v-col cols="auto">
              <v-text-field
                v-model="search"
                placeholder="搜索邮箱或昵称"
                density="compact"
                variant="outlined"
                hide-details
                style="max-width: 240px"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn @click="loadUsers">搜索</v-btn>
            </v-col>
          </v-row>

          <v-data-table-server
            :headers="headers"
            :items="users"
            :loading="loading"
            :items-length="total"
            :items-per-page="pageSize"
            :page="page"
            :items-per-page-options="[10, 20, 50]"
            @update:options="handleOptionsChange"
          >
            <template v-slot:item.role="{ item }">
              <v-chip :color="item.role === 'admin' ? 'primary' : 'grey'" size="small" variant="flat">
                {{ item.role === 'admin' ? '管理员' : '用户' }}
              </v-chip>
            </template>
            <template v-slot:item.isActive="{ item }">
              <v-chip :color="item.isActive ? 'success' : 'grey'" size="small" variant="flat">
                {{ item.isActive ? '启用' : '禁用' }}
              </v-chip>
            </template>
            <template v-slot:item.createdAt="{ item }">
              {{ new Date(item.createdAt).toLocaleString('zh-CN') }}
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="action-buttons">
                <v-btn size="small" variant="text" @click="handleEdit(item)">
                  编辑
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

      <v-dialog v-model="showEditModal" max-width="500">
        <v-card>
          <v-card-title>{{ editingUser ? '编辑用户' : '查看用户' }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="邮箱"
                :value="editForm.email"
                variant="outlined"
                readonly
              />
              <v-text-field
                v-model="editForm.nickname"
                label="昵称"
                variant="outlined"
              />
              <v-select
                v-model="editForm.role"
                label="角色"
                :items="roleOptions"
                variant="outlined"
              />
              <div class="switch-row">
                <v-switch
                  v-model="editForm.isActive"
                  label="状态"
                  color="success"
                  :true-value="true"
                  :false-value="false"
                />
                <span class="switch-label">{{ editForm.isActive ? '启用' : '禁用' }}</span>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="showEditModal = false">取消</v-btn>
            <v-btn color="primary" :loading="updating" @click="handleUpdateUser">
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '~/components/AdminLayout.vue'

const toast = useToast()

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
  { title: '普通用户', value: 'user' },
  { title: '管理员', value: 'admin' },
]

const headers = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '邮箱', key: 'email' },
  { title: '昵称', key: 'nickname' },
  { title: '角色', key: 'role', width: 100 },
  { title: '状态', key: 'isActive', width: 80 },
  { title: '注册时间', key: 'createdAt', width: 160 },
  { title: '操作', key: 'actions', width: 140, sortable: false },
]

const handleOptionsChange = (options: any) => {
  page.value = options.page
  pageSize.value = options.itemsPerPage
  loadUsers()
}

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
    toast.error(e, '加载失败')
  } finally {
    loading.value = false
  }
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
    if (import.meta.client) {
      alert('更新成功')
    }
    showEditModal.value = false
    loadUsers()
  } catch (e: any) {
    toast.error(e, '更新失败')
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
    if (import.meta.client) {
      alert(user.isActive ? '已禁用' : '已启用')
    }
    loadUsers()
  } catch (e: any) {
    toast.error(e, '操作失败')
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
.action-buttons {
  display: flex;
  gap: 4px;
}
.switch-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.switch-label {
  color: #666;
  font-size: 14px;
  margin-top: 16px;
}
</style>
