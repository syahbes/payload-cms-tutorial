import type { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/generate-slug.hook'
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { CACHE_TAG_ARTICLES, STATUS_OPTIONS } from './constants'
import { revalidateTag } from 'next/cache'

// fields
// - title
// - slug (generated from title)
// - content (rich text, WYCWYG ed)
// - content_summary (auto-generated from content; for SEO and article )
// - read_time_in_mins (auto-calculated from content)
// - cover_image (optional)
// - author (relation to Users)
// - status (draft, published)
// - published_at (only when status is published)

export const Articles: CollectionConfig = {
  slug: 'articles',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [generateSlugHook],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'contentSummary',
      type: 'textarea',
      required: true,
      hooks: {
        beforeValidate: [generateContentSummaryHook],
      },
    },
    {
      name: 'readTimeInMins',
      type: 'number',
      defaultValue: 0,
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensure that the data is not stored in DB
            delete siblingData.readTimeInMins
          },
        ],
        afterRead: [
          ({ data }) => {
            const text = convertLexicalToPlaintext({ data: data?.content })
            const wordsPerMinute = 200 // average reading speed
            const words = text.split(' ').length
            const readTimeInMins = Math.ceil(words / wordsPerMinute)
            return readTimeInMins
          },
        ],
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'article-authors',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: Object.values(STATUS_OPTIONS),
      defaultValue: STATUS_OPTIONS.DRAFT,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        condition: (data) => data?.status === STATUS_OPTIONS.PUBLISHED,
      },
    },
  ],
  hooks: {
    afterChange: [() => revalidateTag(CACHE_TAG_ARTICLES, 'max')],
  },
}
