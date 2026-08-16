export default defineEventHandler(async () => {
  const articles = await queryCollection('content')
    .where('path', 'LIKE', '/articles/%')
    .where('status', '=', true)
    .all()
  
  return articles.map(article => ({
    loc: article.path,
    lastmod: article.pubDate,
    changefreq: 'weekly',
    priority: 0.8
  }))
})
