<template>
  <div class="w-full h-full">
    <UContainer>
      <app-header></app-header>
        <slot />
      <app-footer></app-footer>
      <CookieConsent />
    </UContainer>
  </div>
</template>
