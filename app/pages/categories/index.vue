<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
import { formatDate } from '~/utils/date'

useSeo({
  title: '分類',
  description: '瀏覽艾玩不累格所有文章分類，按分類查看相關文章'
})

const { data: articles } = await useAsyncData("categories", () => {
  return queryCollection("content")
    .where("path", "LIKE", "/articles/%")
    .where("status", "=", true)
    .select("category")
    .all();
});

const categories = computed(() => {
  if (!articles.value) return [];

  const counts = articles.value.reduce(
    (acc, article) => {
      const cat = article.category || "uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
});

const { data: articlesByCategory } = await useAsyncData("articles-by-category", () => {
  return queryCollection("content")
    .where("path", "LIKE", "/articles/%")
    .where("status", "=", true)
    .select("title", "pubDate", "path", "category")
    .all();
});

const categoryArticles = computed(() => {
  if (!articlesByCategory.value) return [];
  
  const grouped = articlesByCategory.value.reduce((acc, article) => {
    const cat = article.category || "uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {} as Record<string, typeof articlesByCategory.value>);
  
  return Object.entries(grouped)
    .map(([category, articles]) => ({
      category,
      articles: articles
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 10),
      total: articles.length
    }))
    .sort((a, b) => b.articles.length - a.articles.length);
});
</script>

<template>
  <main>
    <JsonLd />
    <UContainer class="container mx-auto px-4 py-8">
      <Breadcrumb :items="[{ label: '首頁', to: '/' }, { label: '分類' }]" />

      <h1 class="text-3xl font-bold mb-8">分類</h1>

      <p v-if="!categories.length" class="text-gray-500">目前沒有分類</p>

      <div v-else class="flex flex-wrap items-center gap-3">
        <span
          v-for="cat in categories"
          :key="cat.category"
          class="inline-flex items-center bg-cyan-500 px-2 py-1 rounded-lg hover:outline outline-cyan-500/50 hover:shadow-lg shadow-cyan-500/50"
        >
          <NuxtLink
            :to="`/categories/${cat.category}`"
            class="text-white inline-flex items-center gap-2 transition-colors"
          >
            <span>
              {{ cat.category }}
            </span>

            <span class="bg-white rounded-full min-w-8 h-8 inline-flex items-center justify-center text-gray-800">
              {{ cat.count }}
            </span>
          </NuxtLink>
        </span>
      </div>

      <div class="mt-12">
        <h2 class="text-3xl font-bold mb-8">
          分類文章
        </h2>
        
        <div v-for="group in categoryArticles" :key="group.category" class="mb-12">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-semibold text-cyan-600">
              {{ group.category }}
            </h3>
            <NuxtLink 
              :to="`/categories/${group.category}`"
              class="text-sm text-cyan-500 hover:text-cyan-700 transition-colors"
            >
              查看全部 ({{ group.total }} 篇)
            </NuxtLink>
          </div>
          
          <UTimeline 
            :items="group.articles.map(a => ({
              date: formatDate(a.pubDate),
              title: a.title,
              path: a.path,
              icon: 'i-lucide-file-text',
            }))"
          >
            <template #title="{ item }">
              <NuxtLink 
                :to="item.path" 
                class="text-blue-600 hover:text-blue-800 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
              >
                {{ item.title }}
              </NuxtLink>
            </template>
          </UTimeline>
        </div>
      </div>
    </UContainer>
  </main>
</template>
