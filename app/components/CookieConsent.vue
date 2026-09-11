<script setup lang="ts">
const CONSENT_KEY = 'cookie-consent'

const visible = ref(false)

function grantConsent() {
  const { initialize, gtag } = useGtag()
  initialize()
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
}

function accept() {
  try {
    localStorage.setItem(CONSENT_KEY, 'accepted')
  } catch {}
  grantConsent()
  visible.value = false
}

function reject() {
  try {
    localStorage.setItem(CONSENT_KEY, 'rejected')
  } catch {}
  visible.value = false
}

onMounted(() => {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(CONSENT_KEY)
  } catch {}
  if (saved === 'accepted') {
    grantConsent()
    visible.value = false
  } else if (saved === 'rejected') {
    visible.value = false
  } else {
    visible.value = true
  }
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed bottom-4 inset-x-4 z-50 flex justify-center pointer-events-none"
  >
    <UCard class="pointer-events-auto w-full max-w-2xl shadow-lg">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-muted">
          我們使用 Cookie 進行流量分析（Google Analytics），以改善網站體驗。您可以選擇接受或拒絕。
        </p>
        <div class="flex gap-2 shrink-0">
          <UButton color="neutral" variant="outline" size="sm" @click="reject">
            拒絕
          </UButton>
          <UButton color="primary" size="sm" @click="accept">
            接受
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
