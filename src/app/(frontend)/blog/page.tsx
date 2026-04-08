import { Media } from '@/payload-types'
import { ArticleCard } from './_components/article-card'
import { getArticles } from '@/collections/Articles/fetchers'

function relationIsObject<T>(relation: number | T): relation is T {
  return typeof relation !== 'number'
}

export default async function BlogIndexPage() {
  const articles = await getArticles()

  if (articles.length === 0) {
    return <div>No articles found</div>
  }
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {articles.map(
        ({ id, title, slug, contentSummary, coverImage, readTimeInMins, publishedAt, author }) => {
          if (!relationIsObject(coverImage)) {
            console.warn('Cover image is not an object', coverImage)
            return null
          }
          if (!relationIsObject(author)) {
            console.warn('Author is not an object', author)
            return null
          }

          return (
            <ArticleCard
              key={id}
              title={title}
              href={`/blog/${slug}`}
              summary={contentSummary}
              readTimeMins={readTimeInMins ?? 0}
              publishedAt={new Date(publishedAt ?? new Date())}
              coverImage={coverImage}
              author={{
                avatar: relationIsObject(author.avatar) ? author.avatar : ({ url: '' } as Media),
                name: author.name,
                role: author.role,
              }}
            />
          )
        },
      )}
    </div>
  )
}
