<template>
  <AdminLayout>
    <div class="dashboard">
      <n-h2>仪表盘</n-h2>
      <n-row :gutter="[16, 16]">
        <n-col :span="8">
          <n-card>
            <n-statistic label="总应用数" :value="stats.appCount || 0">
              <template #prefix>📱</template>
            </n-statistic>
          </n-card>
        </n-col>
        <n-col :span="8">
          <n-card>
            <n-statistic label="总评论数" :value="stats.commentCount || 0">
              <template #prefix>💬</template>
            </n-statistic>
          </n-card>
        </n-col>
        <n-col :span="8">
          <n-card>
            <n-statistic label="今日新增评论" :value="stats.todayComments || 0">
              <template #prefix>📈</template>
            </n-statistic>
          </n-card>
        </n-col>
      </n-row>

      <n-card class="mt-4" title="快捷操作">
        <n-space>
          <n-button type="primary" @click="navigateTo('/admin/apps')">
            管理应用
          </n-button>
          <n-button @click="navigateTo('/admin/comments')">
            管理评论
          </n-button>
        </n-space>
      </n-card>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { NCard, NStatistic, NRow, NCol, NH2, NSpace, NButton } from 'naive-ui'

const stats = ref({ appCount: 0, commentCount: 0, todayComments: 0 })

onMounted(async () => {
  try {
    const { token } = useAuthStore()
    const res: any = await $fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (res.data) {
      stats.value = res.data
    }
  } catch (e) {
    console.error('Failed to load stats:', e)
  }
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}
.mt-4 {
  margin-top: 16px;
}
</style>
