<template>
  <AdminLayout>
    <div class="dashboard">
      <div class="page-header">
        <h1 class="page-title">仪表盘</h1>
        <p class="page-subtitle">欢迎回来，{{ authStore.user?.nickname }}</p>
      </div>
      
      <div class="stats-grid">
        <n-card class="stat-card apps-card">
          <div class="stat-icon">📱</div>
          <div class="stat-content">
            <n-statistic :value="stats.appCount || 0" suffix="个">
              <template #prefix>应用数</template>
            </n-statistic>
          </div>
        </n-card>
        
        <n-card class="stat-card comments-card">
          <div class="stat-icon">💬</div>
          <div class="stat-content">
            <n-statistic :value="stats.commentCount || 0" suffix="条">
              <template #prefix>评论数</template>
            </n-statistic>
          </div>
        </n-card>
        
        <n-card class="stat-card today-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <n-statistic :value="stats.todayComments || 0" suffix="条">
              <template #prefix>今日新增</template>
            </n-statistic>
          </div>
        </n-card>
        
        <n-card class="stat-card users-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <n-statistic :value="stats.userCount || 0" suffix="人">
              <template #prefix>用户数</template>
            </n-statistic>
          </div>
        </n-card>
      </div>
      
      <div class="quick-actions">
        <n-card title="快捷操作" class="action-card">
          <n-space wrap>
            <n-button type="primary" @click="navigateTo('/admin/apps')">
              <template #icon>📱</template>
              管理应用
            </n-button>
            <n-button @click="navigateTo('/admin/comments')">
              <template #icon>💬</template>
              管理评论
            </n-button>
            <n-button @click="navigateTo('/admin/apps/create')">
              <template #icon>➕</template>
              创建应用
            </n-button>
          </n-space>
        </n-card>
      </div>
      
      <div class="recent-section">
        <n-card title="最近评论" class="recent-card">
          <div v-if="recentComments.length === 0" class="empty-state">
            <p>暂无评论</p>
          </div>
          <n-space vertical v-else>
            <div v-for="comment in recentComments" :key="comment.id" class="comment-item">
              <div class="comment-header">
                <span class="nickname">{{ comment.nickname }}</span>
                <span class="app-name">{{ comment.appName }}</span>
                <span class="time">{{ formatTime(comment.createdAt) }}</span>
              </div>
              <p class="comment-content">{{ truncate(comment.content, 100) }}</p>
            </div>
          </n-space>
        </n-card>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NStatistic, NSpace, NButton } from 'naive-ui'
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
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}
.page-subtitle {
  color: #666;
  font-size: 14px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
}
.stat-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  border-radius: 14px;
}
.apps-card .stat-icon {
  background: linear-gradient(135deg, #e8f4fd 0%, #d4eafd 100%);
}
.comments-card .stat-icon {
  background: linear-gradient(135deg, #fef3e2 0%, #fde6d0 100%);
}
.today-card .stat-icon {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
}
.users-card .stat-icon {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
}
.stat-content {
  flex: 1;
}
.quick-actions {
  margin-bottom: 24px;
}
.action-card {
  border-radius: 16px;
}
.recent-section {
  margin-bottom: 24px;
}
.recent-card {
  border-radius: 16px;
}
.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}
.comment-item {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.comment-item:last-child {
  border-bottom: none;
}
.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.nickname {
  font-weight: 600;
  color: #333;
}
.app-name {
  padding: 2px 8px;
  background: #f0f5ff;
  color: #2080f0;
  border-radius: 4px;
  font-size: 12px;
}
.time {
  margin-left: auto;
  color: #999;
  font-size: 12px;
}
.comment-content {
  color: #666;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}
</style>
