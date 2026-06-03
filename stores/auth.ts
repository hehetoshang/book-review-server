import { defineStore } from 'pinia'

interface User {
  id: number
  email: string
  username: string
  nickname: string
  role: string
  avatar: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string>('')

  const setUser = (u: User | null) => {
    user.value = u
  }

  const setToken = (t: string) => {
    token.value = t
    if (import.meta.client) {
      localStorage.setItem('auth_token', t)
    }
  }

  const loadToken = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('auth_token')
      if (stored) {
        token.value = stored
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = ''
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  return {
    user,
    token,
    setUser,
    setToken,
    loadToken,
    logout,
    isAuthenticated,
    isAdmin,
  }
})
