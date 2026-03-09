import { H3Error } from 'h3'
import type { WikipediaSummaryResponse } from '~/composables/use-wikidata.types'

export default defineEventHandler(async (event): Promise<WikipediaSummaryResponse | H3Error | null> => {
  try {
    const city = getRouterParam(event, 'city')
    const summary = await $fetch<WikipediaSummaryResponse>(
      `https://ru.wikipedia.org/api/rest_v1/page/summary/${city}`
    )
    return summary
  } catch (error) {
    if (error instanceof H3Error) {
      return error
    }
    return null
  }
})
