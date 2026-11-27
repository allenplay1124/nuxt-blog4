import { toIsoDateTime } from '~/utils/date'

export interface SeoOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}

const SITE_NAME = '艾玩不累格'
const SITE_URL = 'https://allenplay.net'
const DEFAULT_IMAGE = '/images/og-default.jpg'
const DEFAULT_DESCRIPTION = '艾玩不累格 - 吳佳霖的個人部落格，分享程式開發、技術筆記與生活心得'

export const useSeo = (options: SeoOptions = {}) => {
  const route = useRoute()
  
  const pageTitle = options.title 
    ? `${options.title} - ${SITE_NAME}`
    : SITE_NAME
  
  const pageDescription = options.description || DEFAULT_DESCRIPTION
  const pageImage = options.image || DEFAULT_IMAGE
  const pageUrl = options.url || `${SITE_URL}${route.path}`
  const pageType = options.type || 'website'
  const publishedIso = toIsoDateTime(options.publishedTime)
  const modifiedIso = toIsoDateTime(options.modifiedTime) || publishedIso
  const imageMeta = pageImage === DEFAULT_IMAGE
    ? {
        ogImageWidth: 1200,
        ogImageHeight: 670,
        ogImageAlt: `${SITE_NAME} 預設分享圖`,
        twitterImageAlt: `${SITE_NAME} 預設分享圖`,
      }
    : {}

  useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage: pageImage.startsWith('http') ? pageImage : `${SITE_URL}${pageImage}`,
    ogUrl: pageUrl,
    ogType: pageType,
    ogSiteName: SITE_NAME,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: pageImage.startsWith('http') ? pageImage : `${SITE_URL}${pageImage}`,
    ...imageMeta,
  })

  useHead({
    link: [
      { rel: 'canonical', href: pageUrl }
    ]
  })

  if (options.type === 'article' && publishedIso) {
    useHead({
      meta: [
        { property: 'article:published_time', content: publishedIso },
        { property: 'article:modified_time', content: modifiedIso || publishedIso },
        { property: 'article:author', content: options.author || '吳佳霖' },
        ...(options.tags || []).map(tag => ({
          property: 'article:tag',
          content: tag
        }))
      ]
    })
  }
}
