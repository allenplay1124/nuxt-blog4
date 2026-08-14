<template>
  <main class="container mx-auto px-4 py-8">
    <Breadcrumb :items="[
      { label: '首頁', to: '/' },
      { label: '標籤', to: '/tags' },
      { label: tag }
    ]" />

    <h1 class="text-3xl font-bold mb-8">{{ tag }} 標籤文章</h1>

    <p v-if="!articles?.length" class="text-gray-500">
      目前沒有文章
    </p>

    <template v-else>
      <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="(article, index) in paginatedArticles"
          :key="article.path"
          data-reveal
          class="card-enter hover:outline outline-cyan-500/50 hover:shadow-lg shadow-cyan-500/50"
          :style="{ transitionDelay: `${index * 80}ms` }"
          :ui="{
            body: 'p-0',
            header: 'p-0'
          }"
        >
          <NuxtLink :to="article.path" class="block overflow-hidden">
            <img
              v-if="article.image"
              :src="article.image"
              :alt="article.title"
              class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </NuxtLink>

          <div class="p-4">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <NuxtLink
                v-if="article.category"
                :to="`/categories/${article.category}`"
                class="bg-cyan-500 text-white text-sm px-2.5 py-1 rounded hover:outline outline-cyan-500/50 hover:shadow-lg shadow-cyan-500/50"
              >
                {{ article.category }}
              </NuxtLink>
            </div>

            <h2 class="text-xl font-bold mb-2 line-clamp-2">
              <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
            </h2>

            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {{ formatDate(article.pubDate) }}
            </p>

            <p class="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
              {{ truncateSummary(article.summary) }}
            </p>

            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="item in article.tags"
                :key="item"
                :to="`/tags/${item}`"
              >
                <UBadge
                  :label="item"
                  color="neutral"
                  variant="subtle"
                />
              </NuxtLink>
            </div>
          </div>
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
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="currentPage === page
              ? 'bg-cyan-500 text-white px-3 py-1.5 text-sm rounded-md hover:outline outline-cyan-500/50 hover:shadow-lg shadow-cyan-500/50'
              : 'px-3 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
          >
            {{ page }}
          </button>
        </div>

        <UButton
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="ghost"
        />
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag as string

const currentPage = ref(1)
const itemsPerPage = 12

const { data: articles } = await useAsyncData(`tag-${tag}`, () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/articles/%')
    .where('tags', 'LIKE', `%"${tag}"%`)
    .where('status', '=', true)
    .order('pubDate', 'DESC')
    .select('title', 'pubDate', 'path', 'summary', 'tags', 'image', 'category')
    .all()
})

const totalPages = computed(() => {
  const total = articles.value?.length || 0
  return Math.ceil(total / itemsPerPage)
})

const paginatedArticles = computed(() => {
  if (!articles.value) return []
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return articles.value.slice(start, end)
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const truncateSummary = (summary: string, maxLength = 150) => {
  if (!summary) return ''
  return summary.length > maxLength ? summary.substring(0, maxLength) + '...' : summary
}

const gridRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const observeCards = () => {
  observer?.disconnect()
  nextTick(() => {
    gridRef.value?.querySelectorAll('[data-reveal]').forEach((el) => {
      observer?.observe(el)
    })
  })
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  observeCards()
})

onBeforeUnmount(() => observer?.disconnect())

watch(paginatedArticles, () => observeCards())
</script>

<style scoped>
.card-enter {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.card-enter.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
