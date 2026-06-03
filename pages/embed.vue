<template>
  <div class="cc-root" :class="theme">
    <!-- Loading State -->
    <div v-if="loading" class="cc-loading">
      <div class="cc-loading-spinner"></div>
      <span>加载中...</span>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Auth Section (if not logged in) -->
      <div v-if="!isLoggedIn" class="cc-auth">
        <div class="cc-auth-tabs">
          <button 
            class="cc-tab" 
            :class="{ active: authTab === 'login' }"
            @click="authTab = 'login'"
          >登录</button>
          <button 
            class="cc-tab"
            :class="{ active: authTab === 'register' }"
            @click="authTab = 'register'"
          >注册</button>
        </div>

        <!-- Login Form -->
        <form v-if="authTab === 'login'" class="cc-form" @submit.prevent="handleLogin">
          <div class="cc-form-group">
            <label>邮箱</label>
            <input 
              v-model="loginForm.email" 
              type="email" 
              placeholder="your@email.com"
              required
            />
          </div>
          <div class="cc-form-group">
            <label>密码</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码"
              required
            />
          </div>
          <div v-if="authError" class="cc-error">{{ authError }}</div>
          <button type="submit" class="cc-btn primary" :disabled="authLoading">
            {{ authLoading ? '登录中...' : '登录' }}
          </button>
        </form>

        <!-- Register Form -->
        <form v-else class="cc-form" @submit.prevent="handleRegister">
          <div class="cc-form-group">
            <label>邮箱</label>
            <input 
              v-model="registerForm.email" 
              type="email" 
              placeholder="your@email.com"
              required
            />
          </div>
          <div class="cc-form-group">
            <label>昵称</label>
            <input 
              v-model="registerForm.nickname" 
              type="text" 
              placeholder="请输入昵称"
              required
            />
          </div>
          <div class="cc-form-group">
            <label>密码</label>
            <input 
              v-model="registerForm.password" 
              type="password" 
              placeholder="至少6位密码"
              required
            />
          </div>
          <div v-if="authError" class="cc-error">{{ authError }}</div>
          <button type="submit" class="cc-btn primary" :disabled="authLoading">
            {{ authLoading ? '注册中...' : '注册' }}
          </button>
        </form>
      </div>

      <!-- Comment Section -->
      <div v-else class="cc-comments">
        <!-- Comment Form -->
        <div class="cc-comment-form">
          <textarea
            v-model="newComment"
            class="cc-textarea"
            placeholder="写下你的评论..."
            rows="3"
          ></textarea>
          <div class="cc-form-footer">
            <span class="cc-user-info">
              <img :src="userAvatar" class="cc-avatar-small" alt="" />
              {{ currentUser?.nickname }}
            </span>
            <button 
              class="cc-btn primary"
              :disabled="!newComment.trim() || posting"
              @click="handlePostComment"
            >
              {{ posting ? '发表中...' : '发表评论' }}
            </button>
          </div>
          <div v-if="postError" class="cc-error">{{ postError }}</div>
        </div>

        <!-- Comments List -->
        <div class="cc-comments-list">
          <div v-if="comments.length === 0" class="cc-empty">
            <span>暂无评论，快来抢沙发吧！</span>
          </div>

          <div 
            v-for="comment in comments" 
            :key="comment.id" 
            class="cc-comment-item"
          >
            <img :src="comment.avatar || defaultAvatar" class="cc-avatar" alt="" />
            <div class="cc-comment-body">
              <div class="cc-comment-header">
                <span class="cc-nickname">{{ comment.nickname }}</span>
                <span class="cc-time">{{ formatTime(comment.createdAt) }}</span>
              </div>
              <div class="cc-comment-content">{{ comment.content }}</div>
            </div>
          </div>

          <!-- Load More -->
          <div v-if="hasMore" class="cc-load-more">
            <button 
              v-if="!loadingMore" 
              class="cc-btn secondary"
              @click="loadMore"
            >
              加载更多
            </button>
            <span v-else class="cc-loading-text">加载中...</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// Get URL params
const route = useRoute()
const appId = route.query.appId as string
const chapterId = parseInt(route.query.chapterId as string, 10) || 0
const initialToken = route.query.token as string
const theme = (route.query.theme as string) || 'light'
const lang = (route.query.lang as string) || 'zh-CN'

// State
const loading = ref(true)
const isLoggedIn = ref(false)
const internalToken = ref('')
const currentUser = ref<any>(null)
const authTab = ref('login')
const authLoading = ref(false)
const authError = ref('')
const posting = ref(false)
const postError = ref('')
const newComment = ref('')
const comments = ref<any[]>([])
const currentPage = ref(1)
const hasMore = ref(false)
const loadingMore = ref(false)

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ email: '', nickname: '', password: '' })
const defaultAvatar = 'https://cravatar.cn/avatar/default'

// Computed
const userAvatar = computed(() => currentUser.value?.avatar || defaultAvatar)

// Methods
const notifyParent = (type: string, data: any) => {
  if (typeof window !== 'undefined' && window.parent) {
    window.parent.postMessage({ source: 'chapter-comments', type, ...data }, '*')
  }
}

const updateHeight = () => {
  nextTick(() => {
    const height = document.documentElement?.scrollHeight || 400
    notifyParent('resize', { height })
  })
}

const loadComments = async (append = false) => {
  try {
    const res: any = await $fetch('/api/platform/comments', {
      query: {
        appId,
        chapterId,
        page: currentPage.value,
        limit: 20,
      },
    })
    if (res.data) {
      if (append) {
        comments.value = [...comments.value, ...res.data.list]
      } else {
        comments.value = res.data.list
      }
      hasMore.value = currentPage.value < res.data.pagination.totalPages
      notifyParent('commentCount', { count: res.data.pagination.total })
    }
  } catch (e) {
    console.error('Failed to load comments:', e)
  }
}

const loadMore = async () => {
  loadingMore.value = true
  currentPage.value++
  await loadComments(true)
  loadingMore.value = false
  updateHeight()
}

const handleLogin = async () => {
  authLoading.value = true
  authError.value = ''
  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: loginForm.value,
    })
    if (res.data?.token) {
      internalToken.value = res.data.token
      currentUser.value = res.data.user
      isLoggedIn.value = true
      notifyParent('login', { userId: res.data.user?.id })
      currentPage.value = 1
      await loadComments()
    }
  } catch (e: any) {
    authError.value = e.data?.statusMessage || '登录失败'
  } finally {
    authLoading.value = false
  }
}

const handleRegister = async () => {
  authLoading.value = true
  authError.value = ''
  try {
    const res: any = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: registerForm.value.email,
        nickname: registerForm.value.nickname,
        password: registerForm.value.password,
      },
    })
    if (res.err === 'ok') {
      // Auto login after register
      loginForm.value.email = registerForm.value.email
      authTab.value = 'login'
    }
  } catch (e: any) {
    authError.value = e.data?.statusMessage || '注册失败'
  } finally {
    authLoading.value = false
  }
}

const handlePostComment = async () => {
  if (!newComment.value.trim()) return
  posting.value = true
  postError.value = ''
  try {
    await $fetch('/api/platform/comments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${internalToken.value}` },
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
    updateHeight()
  } catch (e: any) {
    postError.value = e.data?.statusMessage || '发表失败'
  } finally {
    posting.value = false
  }
}

const handleProxyLogin = async () => {
  if (!initialToken) return false

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
      currentUser.value = res.data.user
      isLoggedIn.value = true
      return true
    }
  } catch (e) {
    console.error('Proxy login failed:', e)
  }
  return false
}

// Handle postMessage from parent
const handleMessage = (event: MessageEvent) => {
  if (!event.data || event.data.source !== 'parent-sdk') return

  const { action, token } = event.data
  
  if (action === 'setToken') {
    // Parent updates the token, do proxy login again
    handleProxyLoginWithToken(token)
  } else if (action === 'getCommentCount') {
    notifyParent('commentCount', { count: comments.value.length })
  }
}

const handleProxyLoginWithToken = async (token: string) => {
  try {
    const res: any = await $fetch('/api/platform/proxy-login', {
      method: 'POST',
      body: {
        appId,
        proxyToken: token,
      },
    })
    if (res.data?.token) {
      internalToken.value = res.data.token
      currentUser.value = res.data.user
      isLoggedIn.value = true
      currentPage.value = 1
      await loadComments()
    }
  } catch (e) {
    console.error('Proxy login failed:', e)
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

// Lifecycle
onMounted(async () => {
  window.addEventListener('message', handleMessage)

  // Check session storage for existing token
  const storedToken = sessionStorage.getItem('cc_token')
  const storedUser = sessionStorage.getItem('cc_user')
  
  if (storedToken && storedUser) {
    internalToken.value = storedToken
    currentUser.value = JSON.parse(storedUser)
    isLoggedIn.value = true
  } else if (initialToken) {
    const loggedIn = await handleProxyLogin()
    if (loggedIn) {
      sessionStorage.setItem('cc_token', internalToken.value)
      sessionStorage.setItem('cc_user', JSON.stringify(currentUser.value))
    }
  }

  loading.value = false
  await loadComments()
  updateHeight()
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})

watch([comments, isLoggedIn], () => {
  updateHeight()
})
</script>

<style>
/* CSS Variables - Light Theme */
.cc-root {
  --cc-bg: #ffffff;
  --cc-bg-secondary: #f7f8fa;
  --cc-text: #1a1a2e;
  --cc-text-secondary: #666666;
  --cc-border: #e8e8e8;
  --cc-primary: #2080f0;
  --cc-primary-hover: #1660c0;
  --cc-error: #d03050;
  --cc-success: #18a058;
  --cc-disabled: #cccccc;

  background: var(--cc-bg);
  color: var(--cc-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  padding: 16px;
  box-sizing: border-box;
}

/* Dark Theme */
.cc-root.dark {
  --cc-bg: #1a1a2e;
  --cc-bg-secondary: #2a2a3e;
  --cc-text: #e4e4e8;
  --cc-text-secondary: #999999;
  --cc-border: #3a3a4e;
  --cc-primary: #63e2b7;
  --cc-primary-hover: #44c79b;
}

/* Loading */
.cc-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--cc-text-secondary);
}

.cc-loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--cc-border);
  border-top-color: var(--cc-primary);
  border-radius: 50%;
  animation: cc-spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes cc-spin {
  to { transform: rotate(360deg); }
}

/* Auth Section */
.cc-auth {
  max-width: 400px;
  margin: 0 auto;
}

.cc-auth-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  background: var(--cc-bg-secondary);
  padding: 4px;
  border-radius: 8px;
}

.cc-tab {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--cc-text-secondary);
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.cc-tab.active {
  background: var(--cc-bg);
  color: var(--cc-text);
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Form */
.cc-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cc-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cc-form-group label {
  font-size: 13px;
  color: var(--cc-text-secondary);
  font-weight: 500;
}

.cc-form-group input,
.cc-textarea {
  padding: 10px 12px;
  border: 1px solid var(--cc-border);
  border-radius: 8px;
  background: var(--cc-bg);
  color: var(--cc-text);
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.cc-form-group input:focus,
.cc-textarea:focus {
  outline: none;
  border-color: var(--cc-primary);
}

.cc-textarea {
  width: 100%;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.cc-error {
  padding: 8px 12px;
  background: rgba(208, 48, 80, 0.1);
  color: var(--cc-error);
  border-radius: 6px;
  font-size: 13px;
}

/* Buttons */
.cc-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cc-btn.primary {
  background: var(--cc-primary);
  color: #fff;
}

.cc-btn.primary:hover:not(:disabled) {
  background: var(--cc-primary-hover);
}

.cc-btn.primary:disabled {
  background: var(--cc-disabled);
  cursor: not-allowed;
}

.cc-btn.secondary {
  background: var(--cc-bg-secondary);
  color: var(--cc-text);
  border: 1px solid var(--cc-border);
}

.cc-btn.secondary:hover {
  background: var(--cc-border);
}

/* Comment Form */
.cc-comment-form {
  margin-bottom: 24px;
}

.cc-form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.cc-user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--cc-text-secondary);
}

/* Comments List */
.cc-comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cc-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--cc-text-secondary);
}

.cc-comment-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--cc-bg-secondary);
  border-radius: 12px;
}

.cc-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.cc-avatar-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.cc-comment-body {
  flex: 1;
  min-width: 0;
}

.cc-comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.cc-nickname {
  font-weight: 600;
  color: var(--cc-text);
}

.cc-time {
  font-size: 12px;
  color: var(--cc-text-secondary);
}

.cc-comment-content {
  color: var(--cc-text);
  line-height: 1.6;
  word-break: break-word;
}

.cc-load-more {
  text-align: center;
  padding: 16px;
}

.cc-loading-text {
  color: var(--cc-text-secondary);
}
</style>
