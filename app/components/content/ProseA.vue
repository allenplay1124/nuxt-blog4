<script setup lang="ts">
const props = defineProps({
  href: { type: String, default: '' },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined }
})

const isExternal = computed(() => {
  if (!props.href) return false
  return props.href.startsWith('http://') || props.href.startsWith('https://')
})

const linkTarget = computed(() => {
  if (props.target) return props.target
  return isExternal.value ? '_blank' : undefined
})

const linkRel = computed(() => {
  if (props.rel) return props.rel
  return isExternal.value ? 'noopener noreferrer' : undefined
})
</script>

<template>
  <NuxtLink class="text-cyan-500 hover:text-cyan-400 hover:underline" :to="props.href" :target="linkTarget" :rel="linkRel">
    <slot />&ensp;<UIcon name="boxicons:copy" class="size-4" />
  </NuxtLink>
  
</template>
