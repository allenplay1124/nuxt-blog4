<script setup lang="ts">
useSeo({
  title: '標籤雲',
  description: '瀏覽艾玩不累格所有文章標籤，探索感興趣的主題'
})

const { data: articles } = await useAsyncData("tags", () => {
  return queryCollection("content")
    .where("path", "LIKE", "/articles/%")
    .where("status", "=", true)
    .select("tags")
    .all();
});

const tags = computed(() => {
  if (!articles.value) return [];

  const counts = articles.value.reduce(
    (acc, article) => {
      for (const tag of article.tags || []) {
        acc[tag] = (acc[tag] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
});

const maxCount = computed(() => tags.value[0]?.count || 1);

const fontSize = (count: number) => {
  const min = 0.9;
  const max = 2.5;
  const ratio = maxCount.value === 1 ? 1 : count / maxCount.value;
  return `${min + (max - min) * ratio}rem`;
};
</script>

<template>
  <main>
    <JsonLd />
    <UContainer class="container mx-auto px-4 py-8">
      <Breadcrumb :items="[{ label: '首頁', to: '/' }, { label: '標籤雲' }]" />

      <h1 class="text-3xl font-bold mb-8">標籤雲</h1>

      <p v-if="!tags.length" class="text-gray-500">目前沒有標籤</p>

      <div v-else class="flex flex-wrap items-center gap-3">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.tag"
          :to="`/tags/${tag.tag}`"
          :style="{ fontSize: fontSize(tag.count) }"
          class="text-blue-600 hover:text-blue-800 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline transition-colors"
        >
          {{ tag.tag }}({{ tag.count }})
        </NuxtLink>
      </div>
    </UContainer>
  </main>
</template>
