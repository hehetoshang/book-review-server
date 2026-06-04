<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { loadToken } = useAuthStore()
onMounted(() => {
  loadToken()
})
</script>
