<script setup lang="ts">
import BaseHeading from '~/components/base/base-heading/BaseHeading.vue';
import BaseCard from '~/components/base/base-card/BaseCard.vue';
import type { Weather } from '~/types'

defineOptions({
  name: 'WeatherCard'
})

defineProps<{
  weather: Weather | null
}>()
</script>

<template>
  <section class="weather-card">
    <BaseCard tag="section">
      <div>
        <BaseHeading :level="2" class="weather-card__title">
          Погода
        </BaseHeading>
        <ClientOnly>
          <div v-if="weather" class="weather-card__content">
            <span class="weather-card__temp">{{  `${weather.temp}°C` }}</span>
            <span class="weather-card__description">{{ weather.description }}</span>
            <span
              class="weather-card__icon"
              :aria-label="weather.description"
            >
              🌤
            </span>
          </div>
          <div v-else class="weather-card__content">
            <span class="weather-card__temp">—</span>
            <span class="weather-card__description">—</span>
            <span class="weather-card__icon" aria-label="Погода">🌤</span>
          </div>
        </ClientOnly>
      </div>
     
    </BaseCard>
  </section>
</template>

<style lang="scss" scoped>
.weather-card {
  margin-bottom: 1.5rem;

  &__title {
    margin-bottom: 0.75rem;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1rem;
  }

  &__temp {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text, #1a1a1a);
  }

  &__description {
    font-size: 0.9375rem;
    color: var(--color-text-secondary, #4a4a4a);
    text-transform: capitalize;
  }

  &__icon {
    font-size: 2rem;
    line-height: 1;
  }
}
</style>
