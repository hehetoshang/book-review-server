<template>
  <AdminLayout>
    <div class="comments-page">
      <n-h2>评论管理</n-h2>

      <n-card>
        <n-space class="mb-4">
          <n-input v-model:value="search" placeholder="搜索评论内容" style="width: 200px" />
          <n-select v-model:value="filterAppId" :options="appOptions" placeholder="选择应用" style="width: 200px" clearable />
          <n-input v-model:value="filterChapterId" placeholder="章节ID" style="width: 120px" />
          <n-button @click="loadComments">筛选</n-button>
        </n-space>

        <n-data-table
          :columns="columns"
          :data="comments"
          :loading="loading"
          :pagination="pagination"
          remote
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </n-card>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import {
  NCard, NH2, NSpace, NInput, NButton, NDataTable, NSelect, useMessage, useDialog,
  type DataTableColumns,
} from 'naive-ui'
import type { Comment } from '~/types'

const message = useMessage()
const dialog = useDialog()
const comments = ref<Comment[]>([])
const loading = ref(false)
const search = ref('')
const filterAppId = ref('')
const filterChapterId = ref('')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const appOptions = ref<{ label: string; value: string }[]>([])

const pagination = computed(() => ({
  page: page.value,
  pageSize: pageSize.value,
  itemCount: total.value,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
}))

const columns: DataTableColumns<Comment> = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '应用', key: 'appName', width: 150 },
  { title: '章节', key: 'chapterName', ellipsis: { tooltip: true } },
  { title: '内容', key: 'content', ellipsis: { tooltip: true }, width: 300 },
  { title: '用户', key: 'nickname', width: 120 },
  { title: '楼层', key: 'level', width: 60 },
  {
    title: '时间',
    key: 'createdAt',
    width: 160,
    render: (row) => new Date(row.createdAt).toLocaleString('zh-CN'),
  },
  {
    title: '操作',
    key: 'actions',
    width: 80,
    render: (row) => h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row) }, { default: () => '删除' }),
  },
]

const loadComments = async () => {
  loading.value = true
  try {
    const { token } = useAuthStore()
    const params: Record<string, string> = { page: String(page.value), limit: String(pageSize.value) }
    if (search.value) params.search = search.value
    if (filterAppId.value) params.appId = filterAppId.value
    if (filterChapterId.value) params.chapterId = filterChapterId.value
    const res: any = await $fetch('/api/admin/comments', {
      headers: { Authorization: `Bearer ${token.value}` },
      query: params,
    })
    if (res.data) {
      comments.value = res.data.list
      total.value = res.data.pagination.total
    }
  } catch (e: any) {
    message.error(e.data?.statusMessage || '加载失败')
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
      appOptions.value = res.data.list.map((a: any) => ({ label: a.name, value: a.appId }))
    }
  } catch {
    // ignore
  }
}

const handlePageChange = (p: number) => {
  page.value = p
  loadComments()
}

const handlePageSizeChange = (ps: number) => {
  pageSize.value = ps
  page.value = 1
  loadComments()
}

const handleDelete = (comment: Comment) => {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除评论"${comment.content.slice(0, 30)}..."吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        const { token } = useAuthStore()
        await $fetch(`/api/admin/comments/${comment.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token.value}` },
        })
        message.success('评论已删除')
        loadComments()
      } catch (e: any) {
        message.error(e.data?.statusMessage || '删除失败')
      }
    },
  })
}

onMounted(() => {
  loadComments()
  loadApps()
})
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>
