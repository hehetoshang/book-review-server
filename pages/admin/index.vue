<template>
  <AdminLayout>
    <div class="dashboard">
      <div class="page-header">
        <h1 class="page-title">仪表盘</h1>
        <p class="page-subtitle">欢迎回来，{{ authStore.user?.nickname }}</p>
      </div>
      
      <div class="stats-grid">
        <n-card class="stat-card">
          <div class="stat-inner">
            <div class="stat-icon blue">📱</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.appCount || 0 }}</div>
              <div class="stat-label">应用数</div>
            </div>
          </div>
        </n-card>
        
        <n-card class="stat-card">
          <div class="stat-inner">
            <div class="stat-icon orange">💬</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.commentCount || 0 }}</div>
              <div class="stat-label">评论数</div>
            </div>
          </div>
        </n-card>
        
        <n-card class="stat-card">
          <div class="stat-inner">
            <div class="stat-icon green">📈</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.todayComments || 0 }}</div>
              <div class="stat-label">今日新增</div>
            </div>
          </div>
        </n-card>
        
        <n-card class="stat-card">
          <div class="stat-inner">
            <div class="stat-icon purple">👥</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.userCount || 0 }}</div>
              <div class="stat-label">用户数</div>
            </div>
          </div>
        </n-card>
      </div>
      
      <div class="content-grid">
        <n-card title="快捷操作" class="action-card">
          <n-space>
            <n-button type="primary" @click="navigateTo('/admin/apps')">
              管理应用
            </n-button>
            <n-button @click="navigateTo('/admin/comments')">
              管理评论
            </n-button>
          </n-space>
        </n-card>
        
        <n-card title="最近评论" class="recent-card">
          <div v-if="recentComments.length === 0" class="empty">
            暂无评论
          </div>
          <div v-else class="comment-list">
            <div v-for="comment in recentComments" :key="comment.id" class="comment-item">
              <div class="comment-top">
                <span class="nickname">{{ comment.nickname }}</span>
                <span class="time">{{ formatTime(comment.createdAt) }}</span>
              </div>
              <p class="comment-text">{{ truncate(comment.content, 80) }}</p>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NSpace, NButton } from 'naive-ui'
import AdminLayout from '~/components/AdminLayout.vue'

const authStore = useAuthStore()
const stats = ref({ appCount: 0, commentCount: 0, todayComments: 0, userCount: 0 })
const recentComments = ref<any[]>([])

const loadStats = async () => {
  try {
    const { token } = authStore
    const res: any = await $fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (res.data) {
      stats.value = res.data
    }
  } catch (e) {
    console.error('Failed to load stats:', e)
  }
}

const loadRecentComments = async () => {
  try {
    const { token } = authStore
    const res: any = await $fetch('/api/admin/comments', {
      headers: { Authorization: `Bearer ${token.value}` },
      query: { limit: 5 },
    })
    if (res.data) {
      recentComments.value = res.data.list
    }
  } catch (e) {
    console.error('Failed to load comments:', e)
  }
}

const formatTime = (date: string | Date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  return d.toLocaleDateString('zh-CN')
}

const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

onMounted(() => {
  loadStats()
  loadRecentComments()
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}
.page-header {
  margin-bottom: 24px;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
}
.page-subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
.stat-card {
  border-radius: 16px;
}
.stat-inner {
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 14px;
}
.stat-icon.blue {
  background: #e6f4ff;
}
.stat-icon.orange {
  background: #fff7e6;
}
.stat-icon.green {
  background: #e6fffb;
}
.stat-icon.purple {
  background: #f9f0ff;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
}
.stat-label {
  font-size: 14px;
  color: #999;
}
.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
.action-card,
.recent-card {
  border-radius: 16px;
}
.empty {
  text-align: center;
  padding: 32px;
  color: #999;
}
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.comment-item {
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.comment-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.comment-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.nickname {
  font-weight: 600;
  color: #333;
}
.time {
  font-size: 12px;
  color: #999;
}
.comment-text {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
