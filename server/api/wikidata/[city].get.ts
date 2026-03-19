import { createError } from 'h3'
import type { WikipediaSummaryResponse } from '~/composables/use-wikidata.types'

export default defineEventHandler(async (event): Promise<WikipediaSummaryResponse> => {
  try {
    const city = getRouterParam(event, 'city')
    if (!city) {
      throw createError({
        statusCode: 400,
        statusMessage: 'City is required'
      })
    }

    const summary = await $fetch<WikipediaSummaryResponse>(
      `https://ru.wikipedia.org/api/rest_v1/page/summary/${city}`
    )
    return summary
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch city summary'
    })
  }
})
