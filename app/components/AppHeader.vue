<script setup lang="ts">
const searchOpen = ref(false);
const q = ref("");

const links = [
  { label: "首頁", to: "/" },
  { label: "關於我", to: "/about" },
  { label: "分類", to: "/categories" },
  { label: "標籤雲", to: "/tags" },
];

const { data: articles } = await useAsyncData("search", () => {
  return queryCollection("content")
    .where("path", "LIKE", "/articles/%")
    .where("status", "=", true)
    .order("pubDate", "DESC")
    .all();
});

const results = computed(() => {
  const term = q.value.trim().toLowerCase();
  if (!term) return [];
  return (articles.value || [])
    .filter((article) => {
      const haystack = [
        article.title,
        article.summary,
        article.category,
        ...(article.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    })
    .slice(0, 10);
});

const closeSearch = () => {
  searchOpen.value = false;
  q.value = "";
};

onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchOpen.value = true;
    }
  };
  window.addEventListener("keydown", handler);
  onBeforeUnmount(() => window.removeEventListener("keydown", handler));
});
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
        icon="i-lucide-github"
        :to="'https://github.com/allenplay1124'"
        target="_blank"
        color="neutral"
        variant="ghost"
        square
        aria-label="GitHub"
      />
      <UButton
        icon="i-lucide-facebook"
        :to="'https://www.facebook.com/520allenplay'"
        target="_blank"
        color="neutral"
        variant="ghost"
        square
        aria-label="Facebook"
      />
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

  <UModal
    v-model:open="searchOpen"
    title="搜尋文章"
    :ui="{ content: 'sm:max-w-2xl' }"
  >
    <template #content>
      <UInput
        v-model="q"
        icon="i-lucide-search"
        placeholder="輸入關鍵字…"
        autofocus
        size="lg"
        color="cyan"
        class="w-full"
      />

      <ul v-if="results.length" class="mt-4 flex flex-col">
        <li v-for="r in results" :key="r.path">
          <NuxtLink
            :to="r.path"
            class="flex flex-col gap-0.5 rounded-md px-3 py-2.5 hover:bg-elevated"
            @click="closeSearch"
          >
            <span class="font-medium">{{ r.title }}</span>
            <span
              v-if="r.summary"
              class="line-clamp-1 text-sm text-gray-500 dark:text-gray-400"
            >
              {{ r.summary }}
            </span>
          </NuxtLink>
        </li>
      </ul>

      <p
        v-else-if="q.trim()"
        class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        找不到相符文章
      </p>

      <p
        v-else
        class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        輸入關鍵字以搜尋文章（標題、摘要、分類、標籤）
      </p>
    </template>
  </UModal>
</template>
