import type { Buffer } from 'node:buffer'
import { getPlaiceholder } from 'plaiceholder'

export function isEligibleForBlurDataUrl(mime?: string | null) {
  if (!mime?.startsWith('image/')) return false
  if (mime === 'image/svg+xml') return false
  return true
}

export async function generateBlurDataUrl(
  buffer?: Buffer<ArrayBufferLike>,
): Promise<string | null> {
  if (!buffer) {
    console.warn('Failed to generate blur data URL: no buffer provided')
    return null
  }
  const { base64 } = await getPlaiceholder(buffer)
  return base64
}
