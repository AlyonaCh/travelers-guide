<script setup lang="ts">
defineOptions({
  name: 'CityHeader'
})

defineProps<{
  cityName: string
  countryName?: string
}>()
</script>

<template>
  <header class="city-header">
    <BaseHeading level="1" class="city-header__title">
      {{ cityName }}
    </BaseHeading>
    <p v-if="countryName" class="city-header__country">
      {{ countryName }}
    </p>
  </header>
</template>

<style lang="scss" scoped>
.city-header {
  margin-bottom: 1.5rem;

  &__title {
    margin-bottom: 0.25rem;
  }

  &__country {
    margin: 0;
    font-size: 1rem;
    color: var(--color-text-secondary, #6b6b6b);
    font-weight: 500;
  }
}
</style>
