import Image from 'next/image'
import { ArticleMetadata } from '../_components/article-metadata'

const publishedAt = new Date('2025-11-13T20:45:00')

export default async function BlogPostPage() {
  return (
    <div className="prose lg:prose-lg dark:prose-invert">
      {/* title */}
      <h1>How to Create a Blog Tutorial No One Asked For</h1>
      {/* metadata */}
      <ArticleMetadata
        intent="post"
        data={{
          author: {
            avatar: 'https://via.assets.so/img.jpg?w=40&h=40&bg=6b7280&f=png',
            name: 'John Doe',
            role: 'Staff Writer',
          },
          publishedAt,
          readTimeMins: 42,
        }}
        className="not-prose"
      />

      {/* cover image */}
      <Image
        src="https://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png"
        alt="Cover image"
        width={600}
        height={300}
        className="w-full rounded-md object-center object-cover"
      />

      {/* content */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ab temporibus incidunt.
        Similique quia alias quidem laudantium eos adipisci quo nam culpa, facere, quam neque animi
        distinctio dolores, quas labore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Debitis ab temporibus incidunt. Similique quia alias quidem laudantium eos adipisci quo nam
        culpa, facere, quam neque animi distinctio dolores, quas labore. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Debitis ab temporibus incidunt. Similique quia alias quidem
        laudantium eos adipisci quo nam culpa, facere, quam neque animi distinctio dolores, quas
        labore.
      </p>
    </div>
  )
}
