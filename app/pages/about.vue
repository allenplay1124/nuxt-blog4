<script setup lang="ts">
const { data: page } = await useAsyncData("about", () => {
  return queryCollection("content").path("/docs/profile").first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
</script>

<template>
  <UPage>
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