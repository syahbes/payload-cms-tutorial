import type { CollectionConfig } from 'payload'
import { generateBlurDataUrl, isEligibleForBlurDataUrl } from './lib/generate-blur-data-url'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurDataUrl',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation !== 'create') return data
        // 1. check for eligibility
        if (!isEligibleForBlurDataUrl(req.file?.mimetype)) return data
        // 2. if it is, genereate blur hash
        const base64 = await generateBlurDataUrl(req.file?.data)
        if (!base64) return data
        // 3. set it to data.blurDataUrl field
        data.blurDataUrl = base64
        // 4. return data
        return data
      },
    ],
  },
}
