import { H3Error } from 'h3'
import type { OpenMeteoForecastResponse } from '~/composables/use-weather.types'
import type { GeocodingResponse } from '~/composables/use-weather.types'

export default defineEventHandler(async (event): Promise<OpenMeteoForecastResponse | H3Error | null> => {
  try {
    const city = getRouterParam(event, 'city')
    console.log('city', city)
    const geocoding = await $fetch<GeocodingResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=ru&count=1`
      )
    if (!geocoding.results?.[0] || !geocoding.results[0]?.latitude || !geocoding.results[0]?.longitude) {
      throw new H3Error('City not found');
    }
    const latitude = geocoding.results[0].latitude
    const longitude = geocoding.results[0].longitude
    const weather = await $fetch<OpenMeteoForecastResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
    return {
      ...weather,
      country: geocoding.results[0].country
    };
  } catch (error) {
    if (error instanceof H3Error) {
      return error
    }
    return null
  }
})
