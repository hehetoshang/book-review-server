<template>
  <div class="home-page">
    <div class="hero">
      <div class="logo-wrapper">
        <div class="logo">💬</div>
      </div>
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
        <div class="icon-wrapper">🔐</div>
        <h3>安全认证</h3>
        <p>bcrypt 密码哈希 + JWT 令牌，支持第三方代理登录</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrapper">📱</div>
        <h3>多租户隔离</h3>
        <p>每个应用独立的评论空间，支持自定义域名限制</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrapper">💬</div>
        <h3>嵌入评论</h3>
        <p>iframe 嵌入 + JS SDK，支持 Vue/Flutter/React Native</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrapper">📊</div>
        <h3>管理后台</h3>
        <p>Naive UI 构建，应用管理、评论审核、统计仪表盘</p>
      </div>
    </div>

    <div class="quick-start">
      <h2>快速开始</h2>
      <div class="code-block">
        <pre><code>&lt;!-- 引入 SDK --&gt;
&lt;script src="https://your-domain.com/sdk.js"&gt;&lt;/script&gt;

&lt;!-- 使用评论组件 --&gt;
&lt;div
  data-cc-app-id="app_xxx"
  data-cc-chapter-id="123"
&gt;&lt;/div&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f0ff 100%);
  padding: 80px 24px 120px;
}
.hero {
  text-align: center;
  margin-bottom: 80px;
}
.logo-wrapper {
  margin-bottom: 24px;
}
.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  font-size: 48px;
  background: linear-gradient(135deg, #2080f0 0%, #63e2b7 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(32, 128, 240, 0.3);
}
.hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
}
.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto 80px;
}
.feature-card {
  text-align: center;
  padding: 40px 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}
.icon-wrapper {
  font-size: 40px;
  margin-bottom: 20px;
}
.feature-card h3 {
  margin-bottom: 12px;
  color: #1a1a2e;
  font-size: 18px;
  font-weight: 600;
}
.feature-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}
.quick-start {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}
.quick-start h2 {
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 24px;
  font-size: 24px;
}
.code-block {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 24px;
  overflow-x: auto;
}
.code-block pre {
  margin: 0;
  color: #e4e8ec;
  font-size: 14px;
  line-height: 1.6;
}
@media (max-width: 640px) {
  .hero h1 {
    font-size: 32px;
  }
  .subtitle {
    font-size: 16px;
  }
  .home-page {
    padding: 40px 16px 80px;
  }
}
</style>
