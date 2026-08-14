<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
    <UFooter>
        © 2026 <NuxtLink to="/" class="font-bold">{{ config.public.title }}</NuxtLink>. All rights reserved.
    </UFooter>
</template>