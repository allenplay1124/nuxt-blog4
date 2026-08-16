<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first();
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("content", route.path, {
    fields: ["summary"],
  });
});

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return dateStr;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeo({
  title: page.value.title,
  description: page.value.summary,
  image: page.value.image,
  type: 'article',
  publishedTime: page.value.pubDate,
  tags: page.value.tags
})
</script>

<template>
  <UPage>
    <JsonLd 
      :article="{
        title: page.title,
        description: page.summary,
        image: page.image,
        publishedTime: page.pubDate,
        tags: page.tags
      }"
    />
    <UContainer>
      <UPageHeader :title="page.title" :description="page.summary">
        <div class="flex flex-wrap items-center gap-3 mt-4">
          <time 
            v-if="page.pubDate"
            :datetime="page.pubDate"
            class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5"
          >
            <UIcon name="i-lucide-calendar" class="size-4" />
            {{ formatDateTime(page.pubDate) }}
          </time>
          分類：
          <NuxtLink
            v-if="page.category"
            :to="`/categories/${page.category}`"
            class="bg-cyan-500 text-white text-sm px-2.5 py-1 rounded hover:outline outline-cyan-500/50 hover:shadow-lg shadow-cyan-500/50"
          >
            {{ page.category }}
          </NuxtLink>
          標籤：
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="tag in page.tags"
              :key="tag"
              :to="`/tags/${tag}`"
            >
              <UBadge :label="tag" color="neutral" variant="subtle" />
            </NuxtLink>
          </div>
        </div>
      </UPageHeader>

      <img
        v-if="page.image"
        :src="page.image"
        :alt="page.title"
        class="w-full rounded-lg object-cover mt-6"
      />

      <UPageBody>
        <ContentRenderer v-if="page" :value="page" />

        <USeparator v-if="surround?.filter(Boolean).length" />
        <UContentSurround :surround="(surround as any)" />

        <ClientOnly>
          <DisqusComments :identifier="page.path" />
        </ClientOnly>
      </UPageBody>
    </UContainer>

    <template #right>
      <UContentToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>
