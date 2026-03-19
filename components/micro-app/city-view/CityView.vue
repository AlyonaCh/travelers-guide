<script setup lang="ts">
import CityHeader from '~/components/composite/city-header/CityHeader.vue';
import type { CityViewData } from './city-view.types'
import SectionAbout from '~/components/composite/section-about/SectionAbout.vue';
import WeatherCard from '~/components/composite/weather-card/WeatherCard.vue';
import MapPlaceholder from '~/components/composite/map-placeholder/MapPlaceholder.vue';
import IdeasList from '~/components/composite/ideas-list/IdeasList.vue';
import BaseSkeleton from '~/components/base/base-skeleton/BaseSkeleton.vue';

defineOptions({
  name: 'CityView'
})

defineProps<{
  data: CityViewData
  isLoading?: boolean
}>()
</script>

<template>
  <div class="city-view">
    <CityHeader
      :city-name="data.cityName"
      :country-name="data.countryName"
    />
    <BaseSkeleton v-if="isLoading" class="city-view__skeleton city-view__skeleton--about" />
    <SectionAbout v-else :summary="data.summary" />

    <BaseSkeleton v-if="isLoading" class="city-view__skeleton city-view__skeleton--weather" />
    <WeatherCard v-else :weather="data.weather" />

    <BaseSkeleton v-if="isLoading" class="city-view__skeleton city-view__skeleton--map" />
    <MapPlaceholder v-else :map-view="data.mapView" />

    <IdeasList :ideas="data.ideas" />
  </div>
</template>

<style lang="scss" scoped>
.city-view {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;

  &__skeleton {
    margin-bottom: 1.5rem;
    display: block;
    --custom-sceleton-width: 100%;
  }

  &__skeleton--about {
    --custom-sceleton-height: 174px;
  }

  &__skeleton--weather {
    --custom-sceleton-height: 120px;
  }

  &__skeleton--map {
    --custom-sceleton-height: 260px;
  }
}
</style>
