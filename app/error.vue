<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const errorMessages: Record<number, string> = {
  400: '請求錯誤',
  401: '未經授權',
  403: '禁止存取',
  404: '找不到頁面',
  500: '伺服器錯誤',
  502: '閘道錯誤',
  503: '服務暫停',
}

const errorTitle = computed(() => 
  errorMessages[props.error.statusCode] || '發生錯誤'
)

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="w-full h-full">
    <UContainer>
      <AppHeader />
      
      <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 class="text-[6rem] font-bold text-gray-300 dark:text-gray-700">
          {{ error.statusCode }}
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
          {{ errorTitle }}
        </p>
        <UButton 
          class="mt-8"
          color="neutral"
          variant="solid"
          @click="handleError"
        >
          返回首頁
        </UButton>
      </div>
      
      <AppFooter />
    </UContainer>
  </div>
</template>
