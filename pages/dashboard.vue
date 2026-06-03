<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <div class="logo">&#128172;</div>
      <div class="header-right">
        <span class="user-name">{{ authStore.user?.nickname }}</span>
        <v-btn size="small" variant="text" @click="handleLogout">退出</v-btn>
      </div>
    </div>

    <div class="dashboard-content">
      <v-card class="comments-card" variant="outlined">
        <template v-slot:title>
          <span class="card-title">我的评论</span>
          <span class="total">共 {{ total }} 条</span>
        </template>

        <v-card-text>
          <div v-if="loading" class="loading">
            <v-progress-circular indeterminate color="primary" size="48" />
          </div>

          <div v-else-if="comments.length === 0" class="empty">
            暂无评论记录
          </div>

          <div v-else class="comment-list">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <div class="comment-header">
                <span class="app-name">{{ comment.appName }}</span>
                <span class="chapter">{{ comment.chapterName }}</span>
                <span class="time">{{ formatTime(comment.createdAt) }}</span>
              </div>
              <p class="comment-content">{{ truncate(comment.content, 150) }}</p>
            </div>
          </div>

          <div v-if="totalPages > 1" class="pagination">
            <v-pagination v-model="page" :length="totalPages" @update:model-value="loadComments" density="compact" />
          </div>
        </v-card-text>
      </v-card>

      <v-card class="quick-card" variant="outlined">
        <template v-slot:title>
          <span class="card-title">快捷入口</span>
        </template>
        <v-card-text>
          <v-row>
            <v-col cols="auto">
              <v-btn @click="navigateTo('/docs')">开发者文档</v-btn>
            </v-col>
            <v-col cols="auto" v-if="authStore.isAdmin">
              <v-btn color="primary" @click="navigateTo('/admin')">
                管理后台
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth-check',
})

const authStore = useAuthStore()
const comments = ref<any[]>([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const totalPages = ref(0)

const loadComments = async () => {
  loading.value = true
  try {
    const { token } = authStore
    const res: any = await $fetch('/api/user/comments', {
      headers: { Authorization: `Bearer ${token.value}` },
      query: { page: page.value, limit: 10 },
    })
    if (res.data) {
      comments.value = res.data.list
      total.value = res.data.pagination.total
      totalPages.value = res.data.pagination.totalPages
    }
  } catch (e) {
    console.error('Failed to load comments:', e)
  } finally {
    loading.value = false
  }
}

const formatTime = (date: string | Date) => {
  return new Date(date).toLocaleString('zh-CN')
}

const truncate = (text: string, max: number) => {
  return text.length > max ? text.slice(0, max) + '...' : text
}

const handleLogout = () => {
  authStore.logout()
  navigateTo('/login')
}

onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f5f5f5;
}
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}
.logo {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: linear-gradient(135deg, #2080f0 0%, #63e2b7 100%);
  border-radius: 10px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user-name {
  color: #333;
  font-size: 14px;
}
.dashboard-content {
  max-width: 800px;
  margin: 24px auto;
  padding: 0 20px;
}
.comments-card,
.quick-card {
  border-radius: 16px;
  margin-bottom: 20px;
}
.card-title {
  font-weight: 600;
}
.total {
  color: #999;
  font-size: 14px;
  font-weight: normal;
  margin-left: 12px;
}
.loading,
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
}
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.comment-item {
  padding: 16px;
  background: #fafafa;
  border-radius: 12px;
}
.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.app-name {
  font-weight: 600;
  color: #2080f0;
}
.chapter {
  color: #666;
  font-size: 14px;
}
.time {
  margin-left: auto;
  color: #999;
  font-size: 12px;
}
.comment-content {
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 1.6;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
