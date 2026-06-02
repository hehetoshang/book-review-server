<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NDialogProvider>
        <NLayout has-sider class="admin-layout">
          <NLayoutSider bordered :width="220" :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
            <div class="logo">
              <h2 v-if="!collapsed">评论管理平台</h2>
              <h2 v-else>CP</h2>
            </div>
            <NMenu v-model:value="activeMenu" :options="menuOptions" :collapsed="collapsed" @update:value="handleMenuClick" />
          </NLayoutSider>
          <NLayout>
            <NLayoutHeader bordered class="admin-header">
              <div class="header-left">
                <NSpace align="center">
                  <NBreadcrumb>
                    <NBreadcrumbItem v-for="item in breadcrumbs" :key="item">
                      {{ item }}
                    </NBreadcrumbItem>
                  </NBreadcrumb>
                </NSpace>
              </div>
              <div class="header-right">
                <NSpace>
                  <span>{{ authStore.user?.nickname || '管理员' }}</span>
                  <NButton size="small" @click="handleLogout">退出</NButton>
                </NSpace>
              </div>
            </NLayoutHeader>
            <NLayoutContent class="admin-content">
              <slot />
            </NLayoutContent>
          </NLayout>
        </NLayout>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NSpace,
  NButton,
} from 'naive-ui'
import { h } from 'vue'
import type { MenuOption } from 'naive-ui'

const authStore = useAuthStore()
const collapsed = ref(false)
const activeMenu = ref('dashboard')

const themeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#1660c0',
  },
}

const menuOptions: MenuOption[] = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: () => h('span', {}, '📊'),
  },
  {
    label: '应用管理',
    key: 'apps',
    icon: () => h('span', {}, '📱'),
  },
  {
    label: '评论管理',
    key: 'comments',
    icon: () => h('span', {}, '💬'),
  },
  {
    label: '个人设置',
    key: 'settings',
    icon: () => h('span', {}, '⚙️'),
  },
]

const route = useRoute()
watch(
  () => route.path,
  (path) => {
    if (path.includes('/apps')) activeMenu.value = 'apps'
    else if (path.includes('/comments')) activeMenu.value = 'comments'
    else if (path.includes('/settings')) activeMenu.value = 'settings'
    else activeMenu.value = 'dashboard'
  },
  { immediate: true }
)

const breadcrumbs = computed(() => {
  const map: Record<string, string[]> = {
    dashboard: ['仪表盘'],
    apps: ['应用管理'],
    'apps/create': ['应用管理', '创建应用'],
    comments: ['评论管理'],
    settings: ['个人设置'],
  }
  const key = route.path.replace('/admin', '').replace(/^\//, '') || 'dashboard'
  return map[key] || ['仪表盘']
})

const handleMenuClick = (key: string) => {
  const routes: Record<string, string> = {
    dashboard: '/admin',
    apps: '/admin/apps',
    comments: '/admin/comments',
    settings: '/admin/settings',
  }
  if (routes[key]) navigateTo(routes[key])
}

const handleLogout = () => {
  authStore.logout()
  navigateTo('/admin/login')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
}
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
}
.logo h2 {
  font-size: 16px;
  color: #333;
  white-space: nowrap;
}
.admin-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
.admin-content {
  padding: 24px;
  background: #f5f5f5;
}
</style>
