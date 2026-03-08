<script setup lang="ts">
import type { CityViewData } from '~/components/micro-app/city-view/city-view.types'
import { mockOpenRouteServiceMap } from '~/mock/api/openrouteservice'
import { mockAiIdeas } from '~/mock/api/ai-ideas'
import { computed } from 'vue'
import CityView from '~/components/micro-app/city-view/CityView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cityName = computed(() => decodeURIComponent(String(route.params.slug)))

const { summary } = useWikidata(cityName)
const { cityWeather, geocodingResult } = useWeather(cityName)

const cityViewData = computed<CityViewData>(() => ({
  cityName: 'Барселона',
  countryName: geocodingResult.value?.country ?? '',
  summary: summary.value,
  weather: cityWeather.value,
  mapView: mockOpenRouteServiceMap(),
  ideas: mockAiIdeas()
}))
</script>

<template>
  <div class="page-city">
    <CityView :data="cityViewData" />
  </div>
</template>

<style lang="scss" scoped>
.page-city {
  min-height: 100vh;
  background: var(--color-page-bg, #f5f6f8);
}
</style>
