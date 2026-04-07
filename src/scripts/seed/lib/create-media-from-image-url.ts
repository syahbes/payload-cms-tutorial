import { Payload } from 'payload'
import { faker } from '@faker-js/faker'

export async function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
  try {
    const res = await fetch(imageUrl)
    const arrBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrBuffer)

    const minetype = res.headers.get('content-type') || 'image/jpeg'
    const fileSize = buffer.length
    const fileName = res.url.split('/').pop()?.split('?')[0] || 'image.jpg'

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: faker.lorem.words(3),
      },
      draft: true,
      file: {
        data: buffer,
        name: fileName,
        mimetype: minetype,
        size: fileSize,
      },
    })
    return media
  } catch (error) {
    console.warn('Failed to create media from image URL:', error)
    return null
  }
}
