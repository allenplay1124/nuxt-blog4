<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const currentPage = ref(1);
const itemsPerPage = 12;

const { data: articles } = await useAsyncData('home', () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/articles/%')
    .where('status', '=', true)
    .order('pubDate', 'DESC')
    .all()
});

const totalPages = computed(() => {
  const total = articles.value?.length || 0;
  return Math.ceil(total / itemsPerPage);
});

const paginatedArticles = computed(() => {
  if (!articles.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return articles.value.slice(start, end);
});

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const truncateSummary = (summary: string, maxLength = 150) => {
  if (!summary) return '';
  return summary.length > maxLength ? summary.substring(0, maxLength) + '...' : summary;
};
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="article in paginatedArticles"
        :key="article.path"
        :ui="{
          body: 'p-0',
          header: 'p-0'
        }"
      >
        <NuxtLink :to="article.path">
          <img
            v-if="article.image"
            :src="article.image"
            :alt="article.title"
            class="w-full h-48 object-cover"
          />
          
          <div class="p-4">
            <UBadge v-if="article.category" :label="article.category" color="primary" class="mb-2" />
            
            <h2 class="text-xl font-bold mb-2 line-clamp-2">{{ article.title }}</h2>
            
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {{ formatDate(article.pubDate) }}
            </p>
            
            <p class="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
              {{ truncateSummary(article.summary) }}
            </p>
            
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in article.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="subtle"
              />
            </div>
          </div>
        </NuxtLink>
      </UCard>
    </div>
    
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
      <UButton
        :disabled="currentPage === 1"
        @click="currentPage--"
        icon="i-lucide-chevron-left"
        color="neutral"
        variant="ghost"
      />
      
      <div class="flex items-center gap-1">
        <UButton
          v-for="page in totalPages"
          :key="page"
          :label="String(page)"
          :color="currentPage === page ? 'primary' : 'neutral'"
          :variant="currentPage === page ? 'solid' : 'ghost'"
          size="sm"
          @click="currentPage = page"
        />
      </div>
      
      <UButton
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        icon="i-lucide-chevron-right"
        color="neutral"
        variant="ghost"
      />
    </div>
  </main>
</template>
