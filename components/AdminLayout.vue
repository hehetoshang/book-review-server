<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NDialogProvider>
        <NLayout has-sider class="admin-layout">
          <NLayoutSider 
            bordered 
            :width="collapsed ? 64 : 220" 
            :collapsed="collapsed" 
            show-trigger 
            @collapse="collapsed = true" 
            @expand="collapsed = false"
            class="sider"
          >
            <div class="logo-wrapper">
              <div class="logo">💬</div>
              <span v-if="!collapsed" class="logo-text">评论平台</span>
            </div>
            <NMenu 
              v-model:value="activeMenu" 
              :options="menuOptions" 
              :collapsed="collapsed" 
              @update:value="handleMenuClick"
              mode="vertical"
            />
          </NLayoutSider>
          <NLayout class="main-layout">
            <NLayoutHeader bordered class="admin-header">
              <div class="header-left">
                <NBreadcrumb>
                  <NBreadcrumbItem v-for="(item, index) in breadcrumbs" :key="index">
                    {{ item }}
                  </NBreadcrumbItem>
                </NBreadcrumb>
              </div>
              <div class="header-right">
                <NSpace>
                  <span class="user-info">{{ authStore.user?.nickname }}</span>
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
import { ref, computed, watch } from 'vue'
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
  type MenuOption,
} from 'naive-ui'

const authStore = useAuthStore()
const collapsed = ref(false)
const activeMenu = ref('dashboard')

const themeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#1660c0',
    borderRadius: '10px',
  },
  Card: {
    borderRadius: '16px',
  },
  Menu: {
    itemBorderRadius: '10px',
  },
}

const menuOptions: MenuOption[] = [
  { label: '仪表盘', key: 'dashboard' },
  { label: '应用管理', key: 'apps' },
  { label: '用户管理', key: 'users' },
  { label: '评论管理', key: 'comments' },
  { label: '个人设置', key: 'settings' },
]

const route = useRoute()
watch(
  () => route.path,
  (path) => {
    if (path.includes('/apps')) activeMenu.value = 'apps'
    else if (path.includes('/users')) activeMenu.value = 'users'
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
    users: ['用户管理'],
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
    users: '/admin/users',
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
.sider {
  background: #fff;
}
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 64px;
  padding: 16px;
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
.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}
.admin-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: #fff;
}
.header-left {
  flex: 1;
}
.user-info {
  color: #666;
  font-size: 14px;
}
.admin-content {
  padding: 24px;
  background: #f5f5f5;
}
</style>
