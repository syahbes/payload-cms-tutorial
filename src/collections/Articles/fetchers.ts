import { getPayloadClient } from '@/lib/payload/client'
import { CACHE_TAGS_ARTICLES, STATUS_OPTIONS } from './constants'
import { unstable_cache } from 'next/cache'

async function _getPublishedArticles() {
  const payload = await getPayloadClient()
  try {
    const { docs: articles } = await payload.find({
      collection: 'articles',
      where: {
        status: {
          equals: STATUS_OPTIONS.PUBLISHED,
        },
      },
      select: {
        slug: true,
        title: true,
        contentSummary: true,
        author: true,
        coverImage: true,
        status: true,
        readTimeInMins: true,
        publishedAt: true,
      },
    })
    return articles ?? []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getPublishedArticles() {
  return unstable_cache(
    _getPublishedArticles,
    [],
    { tags: [CACHE_TAGS_ARTICLES] },
    // { revalidate: 3600 }, // 1 hour
  )()
}
