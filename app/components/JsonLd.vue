<script setup lang="ts">
import { computed } from 'vue'

const SITE_URL = 'https://blog.allenplay.net'
const SITE_NAME = '艾玩不累格'
const AUTHOR_NAME = '吳佳霖'

interface ArticleSchema {
  title: string
  description: string
  image?: string
  publishedTime: string
  modifiedTime?: string
  author?: string
  url?: string
  tags?: string[]
}

interface BreadcrumbItem {
  name: string
  url: string
}

const props = defineProps<{
  article?: ArticleSchema
  breadcrumbs?: BreadcrumbItem[]
}>()

const websiteSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  author: {
    '@type': 'Person',
    name: AUTHOR_NAME
  }
}))

const organizationSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`
}))

const articleSchema = computed(() => {
  if (!props.article) return null
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.article.title,
    description: props.article.description,
    image: props.article.image 
      ? (props.article.image.startsWith('http') ? props.article.image : `${SITE_URL}${props.article.image}`)
      : `${SITE_URL}/favicon.ico`,
    datePublished: props.article.publishedTime,
    dateModified: props.article.modifiedTime || props.article.publishedTime,
    author: {
      '@type': 'Person',
      name: props.article.author || AUTHOR_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.article.url || SITE_URL
    },
    keywords: props.article.tags?.join(', ')
  }
})

const breadcrumbSchema = computed(() => {
  if (!props.breadcrumbs || props.breadcrumbs.length === 0) return null
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: props.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  }
})
</script>

<template>
  <component :is="'script'" type="application/ld+json">
    {{ JSON.stringify(websiteSchema) }}
  </component>
  <component :is="'script'" type="application/ld+json">
    {{ JSON.stringify(organizationSchema) }}
  </component>
  <component v-if="articleSchema" :is="'script'" type="application/ld+json">
    {{ JSON.stringify(articleSchema) }}
  </component>
  <component v-if="breadcrumbSchema" :is="'script'" type="application/ld+json">
    {{ JSON.stringify(breadcrumbSchema) }}
  </component>
</template>
