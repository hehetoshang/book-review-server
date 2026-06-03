import { JWTPayload } from '~/server/utils/jwt'

declare module 'h3' {
  interface H3EventContext {
    user: {
      id: number
      email: string
      username: string
      nickname: string
      role: string
      avatar: string | null
    } | undefined
  }
}

export interface User {
  id: number
  email: string
  username: string
  nickname: string
  role: string
  avatar: string | null
}

export interface App {
  id: number
  appId: string
  name: string
  domains: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count?: { comments: number }
}

export interface Comment {
  id: number
  appId?: string
  appName?: string
  bookId: number
  bookTitle: string
  chapterId: number
  chapterName: string
  segmentId: number
  content: string
  userId: number
  nickname: string
  avatar?: string
  rootId: number | null
  quoteId: number | null
  level: number
  likeCount: number
  dislikeCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  err: string
  msg?: string
  data: T
}
