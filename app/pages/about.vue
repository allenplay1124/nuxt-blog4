<script setup lang="ts">
const { data: page } = await useAsyncData("about", () => {
  return queryCollection("content").path("/abount").first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeo({
  title: '關於我',
  description: page.value.summary || '關於吳佳霖 - 艾玩不累格作者簡介',
  image: page.value.image
})
</script>

<template>
  <UPage>
    <JsonLd />
    <UContainer>
      <UPageHeader :title="page.title" />

      <img
        v-if="page.image"
        :src="page.image"
        :alt="page.title"
        class="w-32 rounded-full object-cover mt-6"
      />

      <UPageBody>
        <ContentRenderer v-if="page" :value="page" />
      </UPageBody>
    </UContainer>
  </UPage>
</template>