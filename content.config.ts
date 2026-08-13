import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        status: z.boolean().default(false),
        pubDate: z.string().optional(),
        category: z.string().optional(),
        image: z.string().optional(),
        summary: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
