<script setup lang="ts">
import CitySearch from '~/components/composite/city-search/CitySearch.vue';
import CountrySearch from '~/components/composite/country-search/CountrySearch.vue';

function goToCity(cityName: string) {
  navigateTo(`/city/${encodeURIComponent(cityName)}`);
}

function goToCountry(countryCode: string) {
  navigateTo(`/country/${encodeURIComponent(countryCode)}`);
}
</script>

<template>
  <div class="index-page">
    <h1 class="index-page__title">Traveler's Guide</h1>
    <div class="index-page__search-block">
      <CitySearch class="index-page__search" @navigate="goToCity" />
      <CountrySearch class="index-page__search" @navigate="goToCountry" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index-page {
  padding: 1.5rem 0;

  &__title {
    margin: 0 0 1.5rem;
    font-size: 1.75rem;
  }

  &__search-block {
    display: grid;
    grid-gap: 16px
  }

  &__search {
    margin-bottom: 0;
  }
}
</style>
