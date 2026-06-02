<template>
  <div class="home-page">
    <div class="hero">
      <h1>评论开放平台</h1>
      <p class="subtitle">全栈、可嵌入的第三方评论服务</p>
      <div class="actions">
        <n-button type="primary" size="large" @click="navigateTo('/admin/login')">
          进入管理后台
        </n-button>
        <n-button size="large" @click="navigateTo('/docs')">
          开发者文档
        </n-button>
      </div>
    </div>
    <div class="features">
      <div class="feature-card">
        <div class="icon">🔐</div>
        <h3>安全认证</h3>
        <p>bcrypt 密码哈希 + JWT 令牌，支持第三方代理登录</p>
      </div>
      <div class="feature-card">
        <div class="icon">📱</div>
        <h3>多租户隔离</h3>
        <p>每个应用独立的评论空间，支持自定义域名限制</p>
      </div>
      <div class="feature-card">
        <div class="icon">💬</div>
        <h3>嵌入评论</h3>
        <p>iframe 嵌入 + JS SDK，支持 Vue/Flutter/React Native</p>
      </div>
      <div class="feature-card">
        <div class="icon">📊</div>
        <h3>管理后台</h3>
        <p>Naive UI 构建，应用管理、评论审核、统计仪表盘</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<style scoped>
.home-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 24px;
}
.hero {
  text-align: center;
  margin-bottom: 64px;
}
.hero h1 {
  font-size: 48px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #2080f0, #63e2b7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 32px;
}
.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}
.feature-card {
  text-align: center;
  padding: 32px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.feature-card .icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.feature-card h3 {
  margin-bottom: 8px;
  color: #333;
}
.feature-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}
</style>
