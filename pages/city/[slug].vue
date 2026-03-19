<script setup lang="ts">
import type { CityViewData } from '~/components/micro-app/city-view/city-view.types'
import { mockOpenRouteServiceMap } from '~/mock/api/openrouteservice'
import { mockAiIdeas } from '~/mock/api/ai-ideas'
import { computed } from 'vue'
import CityView from '~/components/micro-app/city-view/CityView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cityName = computed(() => decodeURIComponent(String(route.params.slug)))

const { summary, coordinates, isLoading: isWikidataLoading } = useWikidata(cityName)
const { cityWeather, country, isLoading: isWeatherLoading } = useWeather(cityName)
const isLoading = computed(() => isWikidataLoading.value || isWeatherLoading.value)
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
    <CityView :data="cityViewData" :is-loading="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.page-city {
  min-height: 100vh;
  background: $color-page-bg;
}
</style>
