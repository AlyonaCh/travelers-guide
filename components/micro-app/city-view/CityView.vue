<script setup lang="ts">
import CityHeader from '~/components/composite/city-header/CityHeader.vue';
import type { CityViewData } from './city-view.types'
import SectionAbout from '~/components/composite/section-about/SectionAbout.vue';
import WeatherCard from '~/components/composite/weather-card/WeatherCard.vue';
import MapPlaceholder from '~/components/composite/map-placeholder/MapPlaceholder.vue';
import IdeasList from '~/components/composite/ideas-list/IdeasList.vue';

defineOptions({
  name: 'CityView'
})

defineProps<{
  data: CityViewData
}>()
</script>

<template>
  <div class="city-view">
    <CityHeader
      :city-name="data.cityName"
      :country-name="data.countryName"
    />
    <SectionAbout :summary="data.summary" />
    <WeatherCard :weather="data.weather" />
    <MapPlaceholder :map-view="data.mapView" />
    <IdeasList :ideas="data.ideas" />
  </div>
</template>

<style lang="scss" scoped>
.city-view {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;
}
</style>
