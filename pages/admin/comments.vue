<template>
  <AdminLayout>
    <div class="comments-page">
      <div class="page-header">
        <h1 class="page-title">评论管理</h1>
      </div>

      <v-card class="table-card" variant="outlined">
        <v-card-text>
          <v-row class="mb-4" align="center">
            <v-col cols="auto">
              <v-text-field
                v-model="search"
                placeholder="搜索评论内容"
                density="compact"
                variant="outlined"
                hide-details
                style="max-width: 200px"
              />
            </v-col>
            <v-col cols="auto">
              <v-select
                v-model="filterAppId"
                :items="appOptions"
                placeholder="选择应用"
                density="compact"
                variant="outlined"
                clearable
                hide-details
                style="max-width: 180px"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn @click="loadComments">筛选</v-btn>
            </v-col>
          </v-row>

          <v-data-table-server
            :headers="headers"
            :items="comments"
            :loading="loading"
            :items-length="total"
            :items-per-page="pageSize"
            :page="page"
            :items-per-page-options="[10, 20, 50]"
            @update:options="handleOptionsChange"
          >
            <template v-slot:item.createdAt="{ item }">
              {{ new Date(item.createdAt).toLocaleString('zh-CN') }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn size="small" variant="text" color="error" @click="handleDelete(item)">
                删除
              </v-btn>
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '~/components/AdminLayout.vue'

const toast = useToast()

const comments = ref<any[]>([])
const loading = ref(false)
const search = ref('')
const filterAppId = ref('')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const appOptions = ref<{ title: string; value: string }[]>([])

const headers = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '应用', key: 'appName', width: 140 },
  { title: '章节', key: 'chapterName' },
  { title: '内容', key: 'content', width: 280 },
  { title: '用户', key: 'nickname', width: 120 },
  { title: '时间', key: 'createdAt', width: 160 },
  { title: '操作', key: 'actions', width: 80, sortable: false },
]

const handleOptionsChange = (options: any) => {
  page.value = options.page
  pageSize.value = options.itemsPerPage
  loadComments()
}

const loadComments = async () => {
  loading.value = true
  try {
    const { token } = useAuthStore()
    const params: Record<string, string> = { page: String(page.value), limit: String(pageSize.value) }
    if (search.value) params.search = search.value
    if (filterAppId.value) params.appId = filterAppId.value
    const res: any = await $fetch('/api/admin/comments', {
      headers: { Authorization: `Bearer ${token.value}` },
      query: params,
    })
    if (res.data) {
      comments.value = res.data.list
      total.value = res.data.pagination.total
    }
  } catch (e: any) {
    toast.error(e, '加载失败')
  } finally {
    loading.value = false
  }
}

const loadApps = async () => {
  try {
    const { token } = useAuthStore()
    const res: any = await $fetch('/api/admin/apps', {
      headers: { Authorization: `Bearer ${token.value}` },
      query: { limit: '100' },
    })
    if (res.data) {
      appOptions.value = res.data.list.map((a: any) => ({ title: a.name, value: a.appId }))
    }
  } catch {
    // ignore
  }
}

const handleDelete = (comment: any) => {
  if (!confirm('确定要删除这条评论吗？')) return

  ;(async () => {
    try {
      const { token } = useAuthStore()
      await $fetch(`/api/admin/comments/${comment.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token.value}` },
      })
      if (import.meta.client) {
        alert('评论已删除')
      }
      loadComments()
    } catch (e: any) {
      toast.error(e, '删除失败')
    }
  })()
}

onMounted(() => {
  loadComments()
  loadApps()
})
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
</style>
