import type { Country } from '~/types'

export default defineEventHandler((event): Country | null => {
  const code = getRouterParam(event, 'code')
  if (!code) return null
  return null
})
