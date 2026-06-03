<template>
  <div class="embed-container" :data-theme="theme">
    <div v-if="loading" class="loading-state">
      <n-spin size="large" />
      <p class="mt-2">加载中...</p>
    </div>

    <template v-else-if="!isLoggedIn">
      <div class="auth-section">
        <n-tabs type="line" v-model:value="authTab">
          <n-tab-pane name="login" tab="登录">
            <n-form :model="loginForm" @submit.prevent="handleLogin">
              <n-form-item label="邮箱">
                <n-input v-model:value="loginForm.email" type="email" placeholder="your@email.com" />
              </n-form-item>
              <n-form-item label="密码">
                <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" />
              </n-form-item>
              <n-button type="primary" block :loading="authLoading" attr-type="submit">
                登录
              </n-button>
            </n-form>
            <n-divider />
            <p class="switch-link">
              没有账号？<a href="#" @click.prevent="authTab = 'register'">立即注册</a>
            </p>
          </n-tab-pane>
          <n-tab-pane name="register" tab="注册">
            <n-form :model="registerForm" @submit.prevent="handleRegister">
              <n-form-item label="邮箱">
                <n-input v-model:value="registerForm.email" type="email" placeholder="your@email.com" />
              </n-form-item>
              <n-form-item label="昵称">
                <n-input v-model:value="registerForm.nickname" placeholder="请输入昵称" />
              </n-form-item>
              <n-form-item label="密码">
                <n-input v-model:value="registerForm.password" type="password" placeholder="至少6位密码" />
              </n-form-item>
              <n-button type="primary" block :loading="authLoading" attr-type="submit">
                注册
              </n-button>
            </n-form>
            <n-divider />
            <p class="switch-link">
              已有账号？<a href="#" @click.prevent="authTab = 'login'">立即登录</a>
            </p>
          </n-tab-pane>
        </n-tabs>
      </div>
    </template>

    <template v-else>
      <div class="comments-section">
        <div class="comment-form">
          <n-input
            v-model:value="newComment"
            type="textarea"
            placeholder="写下你的评论..."
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
          <n-button type="primary" class="mt-2" :loading="posting" :disabled="!newComment.trim()" @click="handlePostComment">
            发表评论
          </n-button>
        </div>

        <n-divider />

        <div class="comments-list">
          <div v-if="comments.length === 0" class="empty-state">
            暂无评论，快来抢沙发吧！
          </div>
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <img :src="comment.avatar || defaultAvatar" class="avatar" />
              <span class="nickname">{{ comment.nickname }}</span>
              <span class="time">{{ formatTime(comment.createdAt) }}</span>
              <span class="floor">#{{ comment.level }}</span>
            </div>
            <div class="comment-content" v-html="comment.content"></div>
          </div>

          <div v-if="pagination.totalPages > 1" class="pagination">
            <n-pagination
              v-model:page="currentPage"
              :page-count="pagination.totalPages"
              :page-size="pagination.limit"
              @update:page="loadComments"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  NTabs, NTabPane, NForm, NFormItem, NInput, NButton, NDivider, NPagination, NSpin,
} from 'naive-ui'

const route = useRoute()

const appId = route.query.appId as string
const chapterId = parseInt(route.query.chapterId as string, 10) || 0
const initialToken = route.query.token as string
const theme = (route.query.theme as string) || 'light'
const lang = (route.query.lang as string) || 'zh-CN'

const loading = ref(true)
const isLoggedIn = ref(false)
const internalToken = ref('')
const authTab = ref('login')
const authLoading = ref(false)
const posting = ref(false)
const newComment = ref('')
const comments = ref<any[]>([])
const currentPage = ref(1)
const pagination = ref({ page: 1, limit: 20, total: 0, totalPages: 0 })

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ email: '', nickname: '', password: '' })

const defaultAvatar = 'https://cravatar.cn/avatar/default'

const getHeaders = () => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (internalToken.value) {
    headers['Authorization'] = `Bearer ${internalToken.value}`
  }
  return headers
}

const notifyParent = (type: string, data: any) => {
  if (typeof window !== 'undefined' && window.parent) {
    window.parent.postMessage(
      { source: 'chapter-comments', type, data },
      '*'
    )
  }
}

const updateHeight = () => {
  nextTick(() => {
    const height = document.documentElement?.scrollHeight || 400
    notifyParent('resize', { height })
  })
}

const loadComments = async () => {
  try {
    const res: any = await $fetch('/api/platform/comments', {
      query: {
        appId,
        chapterId,
        page: currentPage.value,
        limit: pagination.value.limit,
      },
    })
    if (res.data) {
      comments.value = res.data.list
      pagination.value = res.data.pagination
      notifyParent('commentCount', { count: res.data.pagination.total })
    }
  } catch (e) {
    console.error('Failed to load comments:', e)
  }
}

const handleLogin = async () => {
  authLoading.value = true
  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: loginForm.value.email, password: loginForm.value.password },
    })
    if (res.data?.token) {
      internalToken.value = res.data.token
      isLoggedIn.value = true
      notifyParent('login', { userId: res.data.user?.id })
      loadComments()
    }
  } catch (e: any) {
    console.error('Login failed:', e.data?.statusMessage || e.message)
  } finally {
    authLoading.value = false
  }
}

const handleRegister = async () => {
  authLoading.value = true
  try {
    const res: any = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: registerForm.value.email,
        password: registerForm.value.password,
        nickname: registerForm.value.nickname,
      },
    })
    if (res.err === 'ok') {
      // 注册成功后直接登录
      const loginRes: any = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email: registerForm.value.email, password: registerForm.value.password },
      })
      if (loginRes.data?.token) {
        internalToken.value = loginRes.data.token
        isLoggedIn.value = true
        notifyParent('login', { userId: loginRes.data.user?.id })
      }
    }
  } catch (e: any) {
    console.error('Register failed:', e.data?.statusMessage || e.message)
  } finally {
    authLoading.value = false
  }
}

const handlePostComment = async () => {
  if (!newComment.value.trim()) return
  posting.value = true
  try {
    await $fetch('/api/platform/comments', {
      method: 'POST',
      headers: getHeaders(),
      body: {
        appId,
        chapterId,
        content: newComment.value,
        bookId: parseInt(route.query.bookId as string) || 0,
        chapterName: route.query.chapterName || '',
        segmentId: parseInt(route.query.segmentId as string) || 0,
      },
    })
    newComment.value = ''
    currentPage.value = 1
    await loadComments()
  } catch (e: any) {
    console.error('Post comment failed:', e.data?.statusMessage || e.message)
  } finally {
    posting.value = false
  }
}

const formatTime = (date: string | Date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  return d.toLocaleDateString(lang)
}

// Handle proxy login if token is provided
const handleProxyLogin = async () => {
  if (!initialToken) {
    return
  }

  try {
    const res: any = await $fetch('/api/platform/proxy-login', {
      method: 'POST',
      body: {
        appId,
        proxyToken: initialToken,
        externalId: route.query.externalId || '',
        externalEmail: route.query.externalEmail || '',
        externalNick: route.query.externalNick || '',
      },
    })
    if (res.data?.token) {
      internalToken.value = res.data.token
      isLoggedIn.value = true
    }
  } catch (e) {
    console.error('Proxy login failed:', e)
  }
}

// Listen for postMessage from parent
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('message', (event) => {
      if (!event.data || event.data.source !== 'parent-sdk') return

      const { type, data } = event.data
      if (type === 'setToken') {
        internalToken.value = data.token
        isLoggedIn.value = true
        loadComments()
      } else if (type === 'logout') {
        internalToken.value = ''
        isLoggedIn.value = false
      }
    })
  }

  // Initialize
  const init = async () => {
    if (initialToken) {
      await handleProxyLogin()
    } else {
      loading.value = false
    }
    // Always load comments
    await loadComments()
    updateHeight()
  }

  init()
})

watch([comments, isLoggedIn], () => {
  updateHeight()
})
</script>

<style scoped>
.embed-container {
  background: var(--cc-bg);
  color: var(--cc-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 16px;
  min-height: 200px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.auth-section {
  max-width: 400px;
  margin: 0 auto;
}

.switch-link {
  text-align: center;
  color: var(--cc-text-secondary);
  font-size: 14px;
}

.comments-section {
  max-width: 800px;
  margin: 0 auto;
}

.comment-form {
  margin-bottom: 16px;
}

.mt-2 {
  margin-top: 8px;
}

.comments-list {
  margin-top: 16px;
}

.comment-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--cc-border);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.nickname {
  font-weight: 600;
  font-size: 14px;
}

.time {
  color: var(--cc-text-secondary);
  font-size: 12px;
}

.floor {
  color: var(--cc-text-secondary);
  font-size: 12px;
  margin-left: auto;
}

.comment-content {
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--cc-text-secondary);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
