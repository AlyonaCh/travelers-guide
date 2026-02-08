import type { City } from '~/types'

export default defineEventHandler((event): City | null => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) return null
  return null
})
