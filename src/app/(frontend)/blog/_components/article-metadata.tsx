import Image from 'next/image'
import { Media } from '@/payload-types'

type Author = {
  avatar: Media
  name: string
  role: string
}

type ArticleMetadataProps = {
  data: {
    author: Author
    publishedAt: Date
    readTimeMins: number
  }
  intent: 'card' | 'post'
  className?: string
}

export function ArticleMetadata({ intent, data, className }: ArticleMetadataProps) {
  const { author, publishedAt, readTimeMins } = data

  return (
    <div className={`mt-4 flex items-center justify-between ${className}`}>
      {/* author */}
      <div className={`flex items-center ${intent === 'card' ? 'gap-2' : 'gap-3'}`}>
        {/* author avatar */}
        <Image
          src={author.avatar.url ?? ''}
          alt={`${author.name}'s avatar`}
          width={40}
          height={40}
          className={`${intent === 'card' ? 'size-10' : 'size-11'} rounded-full`}
          sizes="40px"
        />
        {/* author name and role */}
        <div
          className={`flex flex-col leading-none ${intent === 'card' ? 'text-sm gap-1.5' : 'text-base gap-2'}`}
        >
          <p className="font-bold">{author.name}</p>
          <p className="text-dimmed">{author.role}</p>
        </div>
      </div>

      {/* date, read time */}
      <div
        className={`flex flex-col text-right ${intent === 'card' ? 'text-sm gap-1.5' : 'text-base gap-2'}`}
      >
        <time dateTime={new Date(publishedAt).toISOString()} className="leading-none">
          {publishedAt.toLocaleDateString('en-GB', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
        <p className="text-dimmed leading-none">{readTimeMins} minutes read</p>
      </div>
    </div>
  )
}
