<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <div class="logo-wrapper">
        <div class="logo">&#128172;</div>
        <span v-if="!mini" class="logo-text">评论平台</span>
      </div>
      <v-divider />
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.key"
          :value="item.key"
          :active="activeMenu === item.key"
          @click="handleMenuClick(item.key)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" size="20" />
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app height="60" elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>
        <v-breadcrumbs :items="breadcrumbs" divider="/" density="compact" class="pa-0" />
      </v-app-bar-title>
      <v-spacer />
      <span class="user-info">{{ authStore.user?.nickname }}</span>
      <v-btn size="small" variant="text" @click="handleLogout">退出</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="admin-content">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const authStore = useAuthStore()
const drawer = ref(true)
const mini = ref(false)
const activeMenu = ref('dashboard')

const menuItems = [
  { title: '仪表盘', key: 'dashboard', icon: 'mdi-view-dashboard' },
  { title: '应用管理', key: 'apps', icon: 'mdi-cellphone' },
  { title: '用户管理', key: 'users', icon: 'mdi-account-group' },
  { title: '评论管理', key: 'comments', icon: 'mdi-comment-text-multiple' },
  { title: '个人设置', key: 'settings', icon: 'mdi-cog' },
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
  const map: Record<string, any[]> = {
    dashboard: [{ title: '仪表盘', disabled: true }],
    apps: [{ title: '应用管理', disabled: true }],
    'apps/create': [{ title: '应用管理', href: '/admin/apps' }, { title: '创建应用', disabled: true }],
    users: [{ title: '用户管理', disabled: true }],
    comments: [{ title: '评论管理', disabled: true }],
    settings: [{ title: '个人设置', disabled: true }],
  }
  const key = route.path.replace('/admin', '').replace(/^\//, '') || 'dashboard'
  return map[key] || [{ title: '仪表盘', disabled: true }]
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
  flex-shrink: 0;
}
.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}
.user-info {
  color: #666;
  font-size: 14px;
  margin-right: 8px;
}
.admin-content {
  padding: 24px;
  background: #f5f5f5;
}
:deep(.v-navigation-drawer) {
  border-right: 1px solid #f0f0f0;
}
</style>
