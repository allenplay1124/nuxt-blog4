<template>
  <div class="flex items-center gap-2">
    <img src="/images/logo.png" alt="logo" class="h-6 w-auto" />
    <span>{{ config.public.title }}</span>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>
