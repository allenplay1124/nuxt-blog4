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
const SITE_URL = 'https://blog.allenplay.net'
const DEFAULT_IMAGE = '/images/og-default.png'
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
  })

  useHead({
    link: [
      { rel: 'canonical', href: pageUrl }
    ]
  })

  if (options.type === 'article' && options.publishedTime) {
    useHead({
      meta: [
        { property: 'article:published_time', content: options.publishedTime },
        { property: 'article:modified_time', content: options.modifiedTime || options.publishedTime },
        { property: 'article:author', content: options.author || '吳佳霖' },
        ...(options.tags || []).map(tag => ({
          property: 'article:tag',
          content: tag
        }))
      ]
    })
  }
}
