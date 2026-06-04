<template>
  <div class="install-page">
    <div class="install-container">
      <v-card class="install-card" elevation="4">
        <v-card-item class="logo-section pa-8">
          <v-avatar size="64" class="logo mx-auto mb-4" color="primary">
            <v-icon size="32" icon="mdi-database-cog" color="white" />
          </v-avatar>
          <v-card-title class="text-h5 text-center">评论平台安装向导</v-card-title>
          <v-card-subtitle class="text-center">欢迎使用评论开放平台，请完成以下配置</v-card-subtitle>
        </v-card-item>

        <v-divider />

        <v-card-text class="pa-8">
          <!-- Step Indicators -->
          <div class="steps mb-6">
            <div v-for="(s, i) in ['数据库配置', '管理员设置', '完成安装']" :key="i" class="step-item" :class="{ active: step === i + 1, done: step > i + 1 }">
              <v-icon :icon="step > i + 1 ? 'mdi-check-circle' : (step === i + 1 ? 'mdi-circle' : 'mdi-circle-outline')" :color="step > i + 1 ? 'success' : (step === i + 1 ? 'primary' : 'grey')" />
              <span class="ml-2">{{ s }}</span>
            </div>
          </div>

          <v-alert v-if="error" type="error" variant="tonal" density="compact" class="mb-4" closable @click:close="error = ''">
            {{ error }}
          </v-alert>
          <v-alert v-if="successMsg" type="success" variant="tonal" density="compact" class="mb-4" closable @click:close="successMsg = ''">
            {{ successMsg }}
          </v-alert>

          <!-- Step 1: Database Config -->
          <div v-if="step === 1" class="step-panel">
            <v-form ref="dbFormRef" v-model="dbFormValid">
              <!-- Database Type Selector -->
              <div class="mb-6">
                <label class="text-subtitle-1 mb-2 d-block">选择数据库类型</label>
                <v-item-group v-model="db.type" mandatory>
                  <v-row>
                    <v-col v-for="opt in dbTypes" :key="opt.value" cols="4">
                      <v-item v-slot="{ isSelected, toggle }">
                        <v-card
                          variant="outlined"
                          :class="{ 'selected-card': isSelected }"
                          class="pa-4 text-center db-type-card"
                          :color="isSelected ? 'primary' : undefined"
                          @click="toggle"
                        >
                          <v-icon size="36" :icon="opt.icon" :color="isSelected ? 'primary' : 'grey'" class="mb-2" />
                          <div class="text-subtitle-2">{{ opt.label }}</div>
                          <div class="text-caption text-medium-emphasis">{{ opt.desc }}</div>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-item-group>
              </div>

              <!-- SQLite Info -->
              <v-alert v-if="db.type === 'sqlite'" type="info" variant="tonal" class="mb-4">
                <template #title>SQLite 数据库</template>
                SQLite 将自动创建在固定位置：<code>{{ sqlitePath }}</code><br />
                适合小型部署，无需额外配置。
              </v-alert>

              <!-- MySQL Config -->
              <div v-if="db.type === 'mysql'">
                <v-alert type="info" variant="tonal" class="mb-4">
                  <template #title>MySQL 数据库配置</template>
                  请确保数据库已创建，并填写连接信息。
                </v-alert>

                <v-row>
                  <v-col cols="8">
                    <v-text-field v-model="db.host" label="数据库主机" placeholder="localhost" variant="outlined" :rules="[v => !!v || '必填']" />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model.number="db.port" label="端口" type="number" placeholder="3306" variant="outlined" :rules="[v => !!v || '必填']" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="db.user" label="用户名" placeholder="root" variant="outlined" :rules="[v => !!v || '必填']" />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="db.password" label="密码" type="password" placeholder="数据库密码" variant="outlined" />
                  </v-col>
                </v-row>
                <v-text-field v-model="db.database" label="数据库名称" placeholder="chapter_comments" variant="outlined" :rules="[v => !!v || '必填']" />
              </div>

              <!-- PostgreSQL Config -->
              <div v-if="db.type === 'postgresql'">
                <v-alert type="info" variant="tonal" class="mb-4">
                  <template #title>PostgreSQL 数据库配置</template>
                  请确保数据库已创建，并填写连接信息。
                </v-alert>

                <v-row>
                  <v-col cols="8">
                    <v-text-field v-model="db.host" label="数据库主机" placeholder="localhost" variant="outlined" :rules="[v => !!v || '必填']" />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model.number="db.port" label="端口" type="number" placeholder="5432" variant="outlined" :rules="[v => !!v || '必填']" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="db.user" label="用户名" placeholder="postgres" variant="outlined" :rules="[v => !!v || '必填']" />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="db.password" label="密码" type="password" placeholder="数据库密码" variant="outlined" />
                  </v-col>
                </v-row>
                <v-text-field v-model="db.database" label="数据库名称" placeholder="chapter_comments" variant="outlined" :rules="[v => !!v || '必填']" />
              </div>

              <!-- Test Connection Button (only for MySQL/PostgreSQL) -->
              <v-btn v-if="db.type !== 'sqlite'" color="info" variant="tonal" :loading="testingDb" @click="testDb" class="mb-2">
                <v-icon start icon="mdi-database-check" /> 测试连接
              </v-btn>
              <div v-if="dbConnected" class="text-success text-caption mb-2">
                <v-icon size="small" icon="mdi-check-circle" class="mr-1" /> 数据库连接成功
              </div>
            </v-form>
          </div>

          <!-- Step 2: Admin Setup -->
          <div v-if="step === 2" class="step-panel">
            <v-form ref="adminFormRef" v-model="adminFormValid">
              <v-text-field v-model="admin.username" label="管理员用户名" placeholder="admin" variant="outlined" :rules="usernameRules" />
              <v-text-field v-model="admin.email" label="管理员邮箱" type="email" placeholder="admin@example.com" variant="outlined" :rules="[v => !!v || '必填', v => /.+@.+\..+/.test(v) || '格式错误']" />
              <v-text-field v-model="admin.nickname" label="管理员昵称" placeholder="管理员" variant="outlined" :rules="[v => !!v || '必填']" />
              <v-text-field v-model="admin.password" label="管理员密码" type="password" placeholder="至少6位密码" variant="outlined" :rules="[v => !!v || '必填', v => v.length >= 6 || '至少6位']" />
              <v-text-field v-model="admin.confirmPassword" label="确认密码" type="password" placeholder="再次输入密码" variant="outlined" :rules="[v => v === admin.password || '两次密码不一致']" />
              <v-text-field v-model="admin.siteName" label="站点名称" placeholder="我的评论平台" variant="outlined" />
            </v-form>
          </div>

          <!-- Step 3: Complete -->
          <div v-if="step === 3" class="step-panel text-center">
            <v-icon size="80" icon="mdi-check-circle" color="success" class="mb-4" />
            <v-card-title class="text-h5 justify-center">安装完成！</v-card-title>
            <v-card-subtitle>您的评论平台已成功部署</v-card-subtitle>

            <v-alert v-if="envConfig" type="warning" variant="tonal" class="mt-4 mb-4 text-left">
              <template #title>重要：请复制以下配置并更新 <code>.env</code> 文件</template>
              <pre class="env-code mt-2">{{ envConfig }}</pre>
              <v-btn size="small" color="primary" variant="text" @click="copyEnv">复制配置</v-btn>
            </v-alert>

            <p class="text-body-2 text-medium-emphasis mb-4">默认应用 ID: <strong>{{ appId }}</strong></p>

            <v-btn color="primary" size="large" block @click="goToHome">
              进入首页
            </v-btn>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-6" v-if="step < 3">
          <v-btn v-if="step > 1" @click="step--">上一步</v-btn>
          <v-spacer />
          <v-btn color="primary" :loading="installing" :disabled="!canProceed" @click="handleNext">
            {{ step === 1 ? '下一步' : '开始安装' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })

const step = ref(1)
const testingDb = ref(false)
const installing = ref(false)
const dbConnected = ref(false)
const dbFormValid = ref(false)
const adminFormValid = ref(false)
const error = ref('')
const successMsg = ref('')
const appId = ref('')

// Database type options
const dbTypes = [
  { value: 'sqlite', label: 'SQLite', desc: '轻量级，免配置', icon: 'mdi-database' },
  { value: 'mysql', label: 'MySQL', desc: '高性能，常用', icon: 'mdi-database-outline' },
  { value: 'postgresql', label: 'PostgreSQL', desc: '企业级，功能强大', icon: 'mdi-database-sync' },
]

// SQLite 固定路径
const sqlitePath = 'data/chapter_comments.db'

const db = ref({
  type: 'sqlite',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'chapter_comments',
})
const admin = ref({ username: '', email: '', nickname: '', password: '', confirmPassword: '', siteName: '评论开放平台' })

const dbFormRef = ref()
const adminFormRef = ref()

const usernameRules = [
  (v: string) => !!v || '请输入用户名',
  (v: string) => /^[a-zA-Z0-9_]{2,20}$/.test(v) || '用户名只能包含字母、数字和下划线，长度2-20位',
]

const canProceed = computed(() => {
  if (step.value === 1) {
    // SQLite 不需要测试连接，直接可用
    if (db.value.type === 'sqlite') return true
    return dbConnected.value
  }
  if (step.value === 2) return adminFormValid.value
  return false
})

const envConfig = computed(() => {
  if (db.value.type === 'sqlite') {
    return `# 数据库配置 (SQLite)\nDATABASE_URL="sqlite+aiosqlite:///./data/chapter_comments.db"\nDATABASE_TYPE="sqlite"`
  }
  if (db.value.type === 'mysql') {
    return `# 数据库配置 (MySQL)\nDATABASE_URL="mysql+aiomysql://${db.value.user}:${encodeURIComponent(db.value.password)}@${db.value.host}:${db.value.port}/${db.value.database}"\nDATABASE_TYPE="mysql"`
  }
  if (db.value.type === 'postgresql') {
    return `# 数据库配置 (PostgreSQL)\nDATABASE_URL="postgresql+asyncpg://${db.value.user}:${encodeURIComponent(db.value.password)}@${db.value.host}:${db.value.port}/${db.value.database}"\nDATABASE_TYPE="postgresql"`
  }
  return ''
})

const testDb = async () => {
  testingDb.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/install/test-db', {
      method: 'POST',
      body: {
        type: db.value.type,
        host: db.value.host,
        port: db.value.port,
        user: db.value.user,
        password: db.value.password,
        database: db.value.database,
      },
    })
    if (res.err === 'ok') {
      dbConnected.value = true
      successMsg.value = '数据库连接成功'
    } else {
      throw new Error(res.message || '连接失败')
    }
  } catch (e: any) {
    error.value = e.data?.message || e.message || '连接失败'
  } finally {
    testingDb.value = false
  }
}

const handleNext = async () => {
  if (step.value === 2) {
    await handleInstall()
    return
  }
  step.value++
}

const handleInstall = async () => {
  installing.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/install/setup', {
      method: 'POST',
      body: {
        ...admin.value,
        databaseType: db.value.type,
        databaseUrl: buildDatabaseUrl(),
      },
    })
    if (res.err === 'ok' || res.data) {
      appId.value = res.data?.app?.appId || res.data?.appId || ''
      step.value = 3
      // Mark installed
      if (import.meta.client) {
        sessionStorage.setItem('install_done', 'true')
      }
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage || e.data?.message || e.message || '安装失败'
  } finally {
    installing.value = false
  }
}

const buildDatabaseUrl = () => {
  if (db.value.type === 'sqlite') {
    return 'sqlite+aiosqlite:///./data/chapter_comments.db'
  }
  if (db.value.type === 'mysql') {
    return `mysql+aiomysql://${db.value.user}:${encodeURIComponent(db.value.password)}@${db.value.host}:${db.value.port}/${db.value.database}`
  }
  if (db.value.type === 'postgresql') {
    return `postgresql+asyncpg://${db.value.user}:${encodeURIComponent(db.value.password)}@${db.value.host}:${db.value.port}/${db.value.database}`
  }
  return ''
}

const copyEnv = () => {
  navigator.clipboard.writeText(envConfig.value)
  successMsg.value = '已复制到剪贴板'
}

const goToHome = () => navigateTo('/')

onMounted(() => {
  // If SQLite, auto-approve
  if (db.value.type === 'sqlite') {
    dbConnected.value = true
  }
  
  if (import.meta.client && sessionStorage.getItem('install_done')) {
    navigateTo('/', { redirectCode: 302 })
  }
})
</script>

<style scoped>
.install-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}
.install-container { width: 100%; max-width: 580px; }
.install-card { border-radius: 20px; }
.logo { background: linear-gradient(135deg, #2080f0 0%, #63e2b7 100%); }
.steps { display: flex; gap: 12px; }
.step-item { display: flex; align-items: center; font-size: 14px; color: #999; flex: 1; }
.step-item.active { color: #2080f0; font-weight: 600; }
.step-item.done { color: #4caf50; }
.env-code {
  background: #1a1a2e;
  color: #e4e8ec;
  padding: 12px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  white-space: pre-wrap;
}
.db-type-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border-width: 2px;
}
.db-type-card:hover {
  border-color: #2080f0;
}
.selected-card {
  border-color: #2080f0 !important;
  background: rgba(32, 128, 240, 0.05);
}
</style>
