<template>
  <div class="dashboard-page">
    <v-app-bar elevation="1" density="comfortable">
      <v-container class="d-flex align-center justify-space-between">
        <v-avatar size="36" color="primary">
          <v-icon size="20" icon="mdi-message-text" color="white" />
        </v-avatar>
        <div class="d-flex align-center ga-2">
          <span class="text-body-2 text-medium-emphasis">{{ authStore.user?.nickname }}</span>
          <v-btn size="small" variant="text" @click="handleLogout">退出</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container style="max-width: 800px">
        <v-card variant="outlined" rounded="lg" class="mb-5">
          <template #title>
            <span class="text-h6">我的评论</span>
            <span class="text-caption text-medium-emphasis ml-2">共 {{ total }} 条</span>
          </template>

          <v-progress-circular v-if="loading" indeterminate size="40" class="mx-auto my-10" />

          <div v-else-if="comments.length === 0" class="text-center pa-10 text-medium-emphasis">
            暂无评论记录
          </div>

          <v-card v-else v-for="comment in comments" :key="comment.id" variant="tonal" class="mb-3">
            <v-card-text>
              <div class="d-flex align-center ga-3 mb-2">
                <v-chip size="small" color="primary">{{ comment.appName }}</v-chip>
                <span class="text-caption text-medium-emphasis">{{ comment.chapterName }}</span>
                <v-spacer />
                <span class="text-caption text-medium-emphasis">{{ formatTime(comment.createdAt) }}</span>
              </div>
              <p class="text-body-2 mb-0">{{ truncate(comment.content, 150) }}</p>
            </v-card-text>
          </v-card>

          <div v-if="totalPages > 1" class="d-flex justify-center pa-4">
            <v-pagination v-model="page" :length="totalPages" total-visible="5" @update:model-value="loadComments" />
          </div>
        </v-card>

        <v-card variant="outlined" rounded="lg">
          <template #title>快捷入口</template>
          <v-card-text>
            <div class="d-flex ga-3">
              <v-btn @click="navigateTo('/docs')">开发者文档</v-btn>
              <v-btn v-if="authStore.user?.role === 'admin'" color="primary" @click="navigateTo('/admin')">
                管理后台
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
</style>
