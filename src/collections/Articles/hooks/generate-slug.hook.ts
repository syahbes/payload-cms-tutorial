import type { FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { Article } from '@/payload-types'

export const generateSlugHook: FieldHook<Article, string> = ({ value, data }) => {
  if (value) return slugify(value.trim()) || ''
  return slugify(data?.title?.trim() || '') || ''
}
