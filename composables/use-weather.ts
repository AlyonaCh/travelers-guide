import type { Weather } from '~/types'
import type { OpenMeteoForecastResponse } from './use-weather.types'

type WeatherMeta = {
  description: string
  icon: string
}

const WEATHER_META: Record<number, WeatherMeta> = {
  0: { description: 'Ясно', icon: '01d' },
  1: { description: 'Преимущественно ясно', icon: '02d' },
  2: { description: 'Переменная облачность', icon: '03d' },
  3: { description: 'Пасмурно', icon: '04d' },
  45: { description: 'Туман', icon: '50d' },
  48: { description: 'Изморозь', icon: '50d' },
  51: { description: 'Морось', icon: '09d' },
  53: { description: 'Морось', icon: '09d' },
  55: { description: 'Морось', icon: '09d' },
  61: { description: 'Дождь', icon: '10d' },
  63: { description: 'Дождь', icon: '10d' },
  65: { description: 'Сильный дождь', icon: '10d' },
  71: { description: 'Снег', icon: '13d' },
  73: { description: 'Снег', icon: '13d' },
  75: { description: 'Сильный снег', icon: '13d' },
  77: { description: 'Снежные зёрна', icon: '13d' },
  80: { description: 'Ливень', icon: '09d' },
  81: { description: 'Ливень', icon: '09d' },
  82: { description: 'Сильный ливень', icon: '09d' },
  85: { description: 'Снегопад', icon: '13d' },
  86: { description: 'Сильный снегопад', icon: '13d' },
  95: { description: 'Гроза', icon: '11d' },
  96: { description: 'Гроза с градом', icon: '11d' },
  99: { description: 'Гроза с крупным градом', icon: '11d' }
}

const DEFAULT_WEATHER: WeatherMeta = {
  description: 'Неизвестно',
  icon: '01d'
}

function mapWeather(code: number, temperature: number): Weather {
  const meta = WEATHER_META[code] ?? DEFAULT_WEATHER

  return {
    temp: Math.round(temperature),
    description: meta.description,
    icon: meta.icon
  }
}

async function fetchWeatherByCoords(lat: number, lon: number) {
  return $fetch<OpenMeteoForecastResponse>(
    `https://api.open-meteo.com/v1/forecast`,
    {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true
      }
    }
  )
}

async function fetchGeocoding(city: string) {
  return $fetch<GeocodingResponse>(
    `https://geocoding-api.open-meteo.com/v1/search`,
    {
      params: {
        name: city,
        language: 'ru',
        count: 1
      }
    }
  )
}

export function useWeather(cityName: MaybeRefOrGetter<string>) {
  const config = useRuntimeConfig()

  const name = computed(() => toValue(cityName).trim())
  const isPagesEnv = computed(
    () => config.public.deployEnv === 'pages'
  )

  const { data, error, pending } = useAsyncData(
    () => `weather:${name.value}`,
    async () => {
      if (!name.value) return null

      if (!isPagesEnv.value) {
        return $fetch<OpenMeteoForecastResponse>(
          `/api/weather/${encodeURIComponent(name.value)}`
        )
      }

      const geo = await fetchGeocoding(name.value)
      const location = geo.results?.[0]

      if (!location) return null

      const weather = await fetchWeatherByCoords(
        location.latitude,
        location.longitude
      )

      return {
        ...weather,
        country: location.country
      }
    },
    {
      watch: [name],
      lazy: true,
      server: !isPagesEnv.value
    }
  )

  const cityWeather = computed<Weather | null>(() => {
    const current = data.value?.current_weather
    if (!current) return null

    return mapWeather(current.weathercode, current.temperature)
  })

  const country = computed(() => data.value?.country ?? '')

  return {
    cityWeather,
    country,
    isLoading: pending,
    error
  }
}