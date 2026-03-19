import { createError } from 'h3'
import type { OpenMeteoForecastResponse } from '~/composables/use-weather.types'
import type { GeocodingResponse } from '~/composables/use-weather.types'

export default defineEventHandler(async (event): Promise<OpenMeteoForecastResponse> => {
  try {
    const city = getRouterParam(event, 'city')
    if (!city) {
      throw createError({
        statusCode: 400,
        statusMessage: 'City is required'
      })
    }

    const geocoding = await $fetch<GeocodingResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=ru&count=1`
      )
    if (
      !geocoding.results?.[0]
      || geocoding.results[0].latitude == null
      || geocoding.results[0].longitude == null
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: 'City not found'
      })
    }

    const latitude = geocoding.results[0].latitude
    const longitude = geocoding.results[0].longitude
    const weather = await $fetch<OpenMeteoForecastResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
    return {
      ...weather,
      country: geocoding.results[0].country
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch weather data'
    })
  }
})
