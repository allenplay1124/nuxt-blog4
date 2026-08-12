<script setup lang="ts">
const searchOpen = ref(false);

const links = [
  { label: "首頁", to: "/" },
  { label: "關於我", to: "/about" },
  { label: "分類", to: "/categories" },
  { label: "標籤雲", to: "/tags" },
];
</script>

<template>
  <UHeader :ui="{ content: 'md:hidden', overlay: 'md:hidden', center: 'md:flex' }">
    <template #title>
      <Logo class="h-6 w-auto" />
    </template>

    <template #default>
      <nav class="hidden md:flex items-center gap-1">
        <UButton
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          color="neutral"
          variant="ghost"
        >
          {{ link.label }}
        </UButton>
      </nav>
    </template>

    <template #toggle="{ open, toggle }">
      <UButton
        color="neutral"
        variant="ghost"
        square
        class="md:hidden"
        :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="open ? '關閉選單' : '開啟選單'"
        @click="toggle"
      />
    </template>

    <template #right>
      <UButton
        icon="i-lucide-search"
        color="neutral"
        variant="ghost"
        square
        aria-label="搜尋文章"
        @click="searchOpen = true"
      />
      <UColorModeButton />
    </template>

    <template #body>
      <div class="flex flex-col gap-1">
        <UButton
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          color="neutral"
          variant="ghost"
          block
        >
          {{ link.label }}
        </UButton>
      </div>
    </template>
  </UHeader>
</template>
