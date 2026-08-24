<script setup lang="ts">
const props = defineProps<{
  article: {
    path: string;
    title: string;
    summary?: string;
    image?: string;
    category?: string;
    pubDate?: string;
    tags?: string[];
  };
}>();

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return dateStr;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const ready = ref(false);
onMounted(() => {
  nextTick(() => {
    requestAnimationFrame(() => (ready.value = true));
  });
});
</script>

<template>
  <section v-if="article" class="hero" :class="{ 'is-ready': ready }">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="hero__grain" aria-hidden="true"></div>

    <UContainer>
      <div class="hero__grid">
        <div class="hero__text">
          <div class="hero__kicker hero-reveal" style="--d: 0ms">
            <NuxtLink
              v-if="article.category"
              :to="`/categories/${article.category}`"
              class="hero__cat"
            >
              {{ article.category }}
            </NuxtLink>
            <span class="hero__dot" aria-hidden="true">·</span>
            <time :datetime="article.pubDate">{{ formatDate(article.pubDate) }}</time>
            <span class="hero__flag">最新文章</span>
          </div>

          <h1 class="hero__title hero-reveal" style="--d: 90ms">
            <NuxtLink :to="article.path" class="hero__title-link">
              {{ article.title }}
            </NuxtLink>
          </h1>

          <p class="hero__summary hero-reveal" style="--d: 180ms">
            {{ article.summary }}
          </p>

          <div class="hero-reveal" style="--d: 270ms">
            <UButton
              :to="article.path"
              color="cyan"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
              class="hero__cta"
            >
              閱讀全文
            </UButton>
          </div>
        </div>

        <div class="hero__media hero-reveal" style="--d: 150ms">
          <div class="hero__frame">
            <span class="hero__frame-line" aria-hidden="true"></span>
            <NuxtLink :to="article.path" class="hero__img-wrap">
              <img
                v-if="article.image"
                :src="article.image"
                :alt="article.title"
                class="hero__img"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: clamp(2.5rem, 7vw, 6rem) 0 clamp(2.5rem, 6vw, 5rem);
  isolation: isolate;
  margin-bottom: 30px;
}

/* 青色光暈 + 淡藍圖網格 */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(
      120% 90% at 85% -10%,
      color-mix(in oklab, #06b6d4 22%, transparent) 0%,
      transparent 55%
    ),
    radial-gradient(
      90% 80% at 0% 110%,
      color-mix(in oklab, #06b6d4 12%, transparent) 0%,
      transparent 50%
    );
}

.hero__bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      to right,
      color-mix(in oklab, #06b6d4 10%, transparent) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      color-mix(in oklab, #06b6d4 10%, transparent) 1px,
      transparent 1px
    );
  background-size: 48px 48px;
  mask-image: radial-gradient(120% 100% at 50% 0%, #000 0%, transparent 75%);
  opacity: 0.5;
}

/* 紙感顆粒噪點 */
.hero__grain {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: center;
}

@media (min-width: 1024px) {
  .hero__grid {
    grid-template-columns: 7fr 5fr;
    gap: clamp(2.5rem, 5vw, 4.5rem);
  }
}

.hero__kicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ui-text-muted);
}

.hero__cat {
  color: #06b6d4;
  font-weight: 600;
  border: 1px solid color-mix(in oklab, #06b6d4 45%, transparent);
  border-radius: 9999px;
  padding: 0.2rem 0.7rem;
  transition: background-color 0.25s ease;
}

.hero__cat:hover {
  background-color: color-mix(in oklab, #06b6d4 14%, transparent);
}

.hero__dot {
  opacity: 0.5;
}

.hero__flag {
  position: relative;
  margin-left: 0.25rem;
  padding-left: 0.9rem;
  color: #0891b2;
  font-weight: 700;
}

.hero__flag::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 9999px;
  background: #06b6d4;
  box-shadow: 0 0 0 0.25rem color-mix(in oklab, #06b6d4 30%, transparent);
}

.hero__title {
  font-family: "Noto Serif TC", serif;
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: 0.01em;
  font-size: clamp(2rem, 5.2vw, 3.75rem);
  margin: 0 0 1.25rem;
  text-wrap: balance;
}

.hero__title-link {
  background-image: linear-gradient(
    to right,
    currentColor 0%,
    currentColor 100%
  );
  background-size: 0% 2px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size 0.35s ease;
  color: inherit;
}

.hero__title-link:hover {
  background-size: 100% 2px;
}

.hero__summary {
  max-width: 46ch;
  margin: 0 0 1.75rem;
  font-size: clamp(0.95rem, 1.4vw, 1.125rem);
  line-height: 1.75;
  color: var(--ui-text-toned);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero__cta {
  --ui-radius: 0.75rem;
}

/* 右側封面圖：偏移描邊框 + 青色柔光 */
.hero__media {
  position: relative;
}

.hero__frame {
  position: relative;
  padding: 0.75rem;
}

.hero__frame-line {
  position: absolute;
  inset: -0.5rem -0.5rem auto auto;
  width: 70%;
  height: 70%;
  border: 1.5px solid color-mix(in oklab, #06b6d4 55%, transparent);
  border-radius: 1rem;
  transform: translate(1.25rem, 1.25rem);
  z-index: 0;
}

.hero__img-wrap {
  position: relative;
  display: block;
  z-index: 1;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow:
    0 24px 60px -20px color-mix(in oklab, #06b6d4 45%, transparent),
    0 8px 24px -12px rgba(0, 0, 0, 0.45);
}

.hero__img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.hero__img-wrap:hover .hero__img {
  transform: scale(1.04);
}

/* 錯落浮現 */
.hero-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--d, 0ms);
}

.hero.is-ready .hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .hero-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .hero__img {
    transition: none;
  }
}
</style>
