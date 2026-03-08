<script setup lang="ts">
import type { CityViewData } from '~/components/micro-app/city-view/city-view.types'
import { mockWikidataSummary } from '~/mock/api/wikidata'
import { mockOpenWeather } from '~/mock/api/openweather'
import { mockOpenRouteServiceMap } from '~/mock/api/openrouteservice'
import { mockAiIdeas } from '~/mock/api/ai-ideas'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CityView from '~/components/micro-app/city-view/CityView.vue'


const route = useRoute()

const { data: wikidataSummary } = useFetch('https://ru.wikipedia.org/api/rest_v1/page/summary/Барселона')

const cityViewData = computed<CityViewData>(() => ({
  cityName: 'Барселона',
  countryName: 'Испания',
  summary: (wikidataSummary.value as any)?.extract || '',
  weather: mockOpenWeather(),
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
