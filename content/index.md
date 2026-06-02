# 评论开放平台开发者文档

一个基于 Nuxt 4 的全栈、可嵌入评论平台。支持第三方应用接入、代理登录、多租户评论隔离。

## 功能特性

- **用户认证**：基于 bcrypt 密码哈希 + JWT 令牌
- **多租户隔离**：每个应用独立的评论空间
- **代理登录**：第三方应用通过 HMAC-SHA256 签名代理用户登录
- **嵌入评论**：iframe 嵌入 + postMessage 通信 + JS SDK
- **管理后台**：Naive UI 构建的应用管理、评论审核、统计仪表盘
- **安全防护**：XSS 过滤、频率限制、nonce 防重放、CORS 动态配置

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Nuxt 4 (兼容 Nuxt 3+) |
| 前端 | Vue 3 Composition API + TypeScript |
| UI | Naive UI |
| 数据库 | SQLite (开发) / PostgreSQL (生产) |
| ORM | Prisma |
| 认证 | bcrypt + JWT |
| 文档 | @nuxt/content |

## 项目结构

```
chapter-comments-platform/
├── server/
│   ├── api/
│   │   ├── auth/          # 认证接口
│   │   ├── platform/      # 公开平台接口
│   │   └── admin/         # 管理员接口
│   ├── middleware/        # 全局中间件
│   └── utils/            # 服务端工具
├── pages/
│   ├── admin/            # 管理后台
│   └── embed.vue         # 嵌入式评论组件
├── public/
│   └── sdk.js            # JS SDK
├── prisma/
│   ├── schema.prisma     # 数据库模型
│   └── seed.ts           # 种子脚本
├── composables/          # Vue composables
└── content/              # 开发者文档
```

## 快速开始

查看 [快速开始](/docs/getting-started) 章节。
