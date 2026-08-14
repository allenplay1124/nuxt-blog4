<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first();
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
  <main>
    <UContainer>
      <h1 class="font-bold text-3xl">
        {{ page.title }}
      </h1>
      <ContentRenderer v-if="page" :value="page" />
    </UContainer>
  </main>
</template>
