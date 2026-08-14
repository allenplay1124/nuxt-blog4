<template>
  <div class="flex items-center gap-2 mb-6">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink 
        v-if="item.to && index !== items.length - 1"
        :to="item.to"
        class="text-blue-600 hover:text-blue-800 transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span 
        v-else 
        :class="index === items.length - 1 ? 'text-gray-600 font-medium' : ''"
      >
        {{ item.label }}
      </span>
      <span v-if="index < items.length - 1" class="text-gray-400">></span>
    </template>
  </div>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
