import { CollectionConfig } from 'payload'
import { ARTICLE_AUTHORS_ROLES } from './constants'

export const ArticleAuthors: CollectionConfig = {
  slug: 'article-authors',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: Object.values(ARTICLE_AUTHORS_ROLES),
      defaultValue: ARTICLE_AUTHORS_ROLES.STAFF_WRITER,
      required: true,
    },
  ],
}
