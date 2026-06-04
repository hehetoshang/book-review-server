<template>
  <div class="home-page">
    <div class="hero">
      <div class="logo">&#128172;</div>
      <h1>评论开放平台</h1>
      <p class="subtitle">全栈、可嵌入的第三方评论服务</p>
      <div class="actions">
        <v-btn color="primary" size="x-large" @click="navigateTo('/login')">
          用户登录
        </v-btn>
        <v-btn size="x-large" @click="navigateTo('/admin/login')">
          管理后台
        </v-btn>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <div class="icon blue">&#128272;</div>
        <h3>安全认证</h3>
        <p>bcrypt 密码哈希 + JWT 令牌，支持第三方代理登录</p>
      </div>
      <div class="feature-card">
        <div class="icon green">&#128241;</div>
        <h3>多租户隔离</h3>
        <p>每个应用独立的评论空间，支持自定义域名限制</p>
      </div>
      <div class="feature-card">
        <div class="icon orange">&#128172;</div>
        <h3>嵌入评论</h3>
        <p>iframe 嵌入 + JS SDK，支持 Vue/Flutter/React Native</p>
      </div>
      <div class="feature-card">
        <div class="icon purple">&#128202;</div>
        <h3>管理后台</h3>
        <p>Vuetify 构建，应用管理、评论审核、统计仪表盘</p>
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
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #fff;
  padding: 80px 24px 120px;
}
.hero {
  text-align: center;
  margin-bottom: 80px;
}
.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  font-size: 40px;
  background: linear-gradient(135deg, #2080f0 0%, #63e2b7 100%);
  border-radius: 20px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(32, 128, 240, 0.2);
}
.hero h1 {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
}
.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}
.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto 80px;
}
.feature-card {
  text-align: center;
  padding: 32px 20px;
  background: #fafafa;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}
.feature-card:hover {
  border-color: #2080f0;
  box-shadow: 0 4px 16px rgba(32, 128, 240, 0.1);
}
.icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  border-radius: 14px;
  margin: 0 auto 16px;
}
.icon.blue { background: #e6f4ff; }
.icon.green { background: #e6fffb; }
.icon.orange { background: #fff7e6; }
.icon.purple { background: #f9f0ff; }
.feature-card h3 {
  font-size: 16px;
  color: #1a1a2e;
  margin-bottom: 8px;
}
.feature-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}
.quick-start {
  max-width: 640px;
  margin: 0 auto;
  background: #fafafa;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #f0f0f0;
}
.quick-start h2 {
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 20px;
  font-size: 20px;
}
.code-block {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
}
.code-block pre {
  margin: 0;
  color: #e4e8ec;
  font-size: 13px;
  line-height: 1.6;
}
@media (max-width: 640px) {
  .hero h1 {
    font-size: 28px;
  }
  .home-page {
    padding: 40px 16px 80px;
  }
}
</style>
