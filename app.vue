<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { loadToken } = useAuthStore()
onMounted(() => {
  loadToken()
})
</script>
