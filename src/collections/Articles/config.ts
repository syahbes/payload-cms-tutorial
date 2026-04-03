import type { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/generate-slug.hook'

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
  ],
}
