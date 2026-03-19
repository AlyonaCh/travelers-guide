<script setup lang="ts">
import type { CityViewData } from '~/components/micro-app/city-view/city-view.types'
import { mockOpenRouteServiceMap } from '~/mock/api/openrouteservice'
import { mockAiIdeas } from '~/mock/api/ai-ideas'
import { computed, ref, watchEffect } from 'vue'
import CityView from '~/components/micro-app/city-view/CityView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cityName = ref('')

watchEffect(() => {
  const slug = route.params.slug
  if (typeof slug === 'string' && slug) {
    cityName.value = decodeURIComponent(slug)
  }
})

const {
  summary,
  coordinates,
  isLoading: isWikidataLoading,
  error: wikidataError
} = useWikidata(cityName)
const {
  cityWeather,
  country,
  isLoading: isWeatherLoading,
  error: weatherError
} = useWeather(cityName)
const isLoading = computed(() => isWikidataLoading.value || isWeatherLoading.value)

function formatErrorMessage(value: unknown) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (value instanceof Error) return value.message
  return 'Что-то пошло не так. Попробуйте ещё раз.'
}

const errorMessage = computed(() => {
  const wikidataText = formatErrorMessage(wikidataError.value)
  if (wikidataText) return `Не удалось загрузить информацию о городе.`

  const weatherText = formatErrorMessage(weatherError.value)
  if (weatherText) return `Не удалось загрузить погоду.`

  return ''
})
const mapView = computed(() => ({
  center: {
    lat: coordinates.value.lat,
    lon: coordinates.value.lon
  }
}))

const cityViewData = computed<CityViewData>(() => ({
  cityName: cityName.value,
  countryName: country.value,
  summary: summary.value,
  weather: cityWeather.value,
  mapView: mapView.value,
  ideas: mockAiIdeas()
}))
</script>

<template>
  <div class="page-city">
    <CityView
      :data="cityViewData"
      :is-loading="isLoading"
      :error-message="errorMessage"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.page-city {
  min-height: 100vh;
  background: $color-page-bg;
}
</style>
