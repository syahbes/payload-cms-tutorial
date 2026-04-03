import { getPayload } from 'payload'
import config from '@/payload.config'

export async function seedAdmin() {
  const payload = await getPayload({ config })

  try {
    const response = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'admin',
      },
    })
    console.log('Admin created:', response)
  } catch (error) {
    console.error('Error creating admin:', JSON.stringify(error, null, 2))
  }
}
