import { Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { ARTICLE_AUTHORS_ROLES } from '@/collections/ArticleAuthors/constants'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'

export async function seedArticleAuthor(payload: Payload) {
  try {
    const imageUrl = faker.image.personPortrait({ size: 256 })
    const media = await createMediaFromImageUrl(payload, imageUrl)
    if (!media) {
      console.warn('Stop seeding article authors - failed to create media')
      return
    }

    await payload.create({
      collection: 'article-authors',
      data: {
        name: faker.person.fullName(),
        role: ARTICLE_AUTHORS_ROLES.STAFF_WRITER,
        avatar: media.id,
      },
    })
  } catch (error) {
    console.warn('Error seeding article author:', error)
  }
}
