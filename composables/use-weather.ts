import type { Weather } from '~/types'
import type {
  GeocodingResponse,
  OpenMeteoForecastResponse
} from './use-weather.types'

const WMO_WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: 'Ясно',
  1: 'Преимущественно ясно',
  2: 'Переменная облачность',
  3: 'Пасмурно',
  45: 'Туман',
  48: 'Изморозь',
  51: 'Морось',
  53: 'Морось',
  55: 'Морось',
  61: 'Дождь',
  63: 'Дождь',
  65: 'Сильный дождь',
  71: 'Снег',
  73: 'Снег',
  75: 'Сильный снег',
  77: 'Снежные зёрна',
  80: 'Ливень',
  81: 'Ливень',
  82: 'Сильный ливень',
  85: 'Снегопад',
  86: 'Сильный снегопад',
  95: 'Гроза',
  96: 'Гроза с градом',
  99: 'Гроза с крупным градом'
}

const WMO_WEATHER_ICONS: Record<number, string> = {
  0: '01d',
  1: '02d',
  2: '03d',
  3: '04d',
  45: '50d',
  48: '50d',
  51: '09d',
  53: '09d',
  55: '09d',
  61: '10d',
  63: '10d',
  65: '10d',
  71: '13d',
  73: '13d',
  75: '13d',
  77: '13d',
  80: '09d',
  81: '09d',
  82: '09d',
  85: '13d',
  86: '13d',
  95: '11d',
  96: '11d',
  99: '11d'
}

function mapWeatherCodeToWeather(
  code: number,
  temperature: number
): Weather {
  return {
    temp: Math.round(temperature),
    description: WMO_WEATHER_DESCRIPTIONS[code] ?? 'Неизвестно',
    icon: WMO_WEATHER_ICONS[code] ?? '01d'
  }
}

export function useWeather(cityName: MaybeRefOrGetter<string>) {
  const name = computed(() => toValue(cityName))
  const encodedName = computed(() => encodeURIComponent(name.value))

  const { data: cityGeocoding, status: cityGeocodingStatus } = useAsyncData(
    () => `cityGeocoding-${name.value}`,
    () =>
      $fetch<GeocodingResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodedName.value}&language=ru&count=1`
      ),
    { watch: [name] }
  )

  const latitude = computed(() => cityGeocoding.value?.results?.[0]?.latitude)
  const longitude = computed(() => cityGeocoding.value?.results?.[0]?.longitude)

  const { data: weatherRaw } = useAsyncData(
    () => `cityWeather-${latitude.value}-${longitude.value}`,
    () =>
      $fetch<OpenMeteoForecastResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current_weather=true`
      ),
    { watch: [latitude, longitude] }
  )

  const cityWeather = computed<Weather | null>(() => {
    const current = weatherRaw.value?.current_weather
    if (!current) {
      return null
    }
    return mapWeatherCodeToWeather(current.weathercode, current.temperature)
  })

  const geocodingResult = computed(() => cityGeocoding.value?.results?.[0])

  return {
    cityWeather,
    cityGeocodingStatus,
    geocodingResult
  }
}
