<template>
  <div class="py-8">
    <Breadcrumb :items="[
      { label: '首頁', to: '/' },
      { label: '分類', to: '/categories' },
      { label: category }
    ]" />

    <h1 class="text-3xl font-bold mb-8">{{ category }} 分類文章</h1>

    <p v-if="!articles?.length" class="text-gray-500">
      目前沒有文章
    </p>

    <ul v-else class="space-y-3">
      <li 
        v-for="article in articles" 
        :key="article.path"
        class="flex items-center gap-4"
      >
        <span class="text-gray-500 text-sm whitespace-nowrap min-w-[100px]">
          {{ formatDate(article.pubDate) }}
        </span>
        <NuxtLink 
          :to="article.path" 
          class="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date'

const route = useRoute()
const category = route.params.category as string

const { data: articles } = await useAsyncData(`category-${category}`, () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/articles/%')
    .where('category', '=', category)
    .where('status', '=', true)
    .order('pubDate', 'DESC')
    .select('title', 'pubDate', 'path')
    .all()
})
</script>
