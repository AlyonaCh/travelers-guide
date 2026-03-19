<script setup lang="ts">
import BaseHeading from '~/components/base/base-heading/BaseHeading.vue';
import type { MapView } from '~/types'
import BaseCard from '~/components/base/base-card/BaseCard.vue';

defineOptions({
  name: 'MapPlaceholder'
})

defineProps<{
  mapView: MapView
}>()
</script>

<template>
  <section class="map-placeholder">
    <BaseCard tag="section">
      <BaseHeading :level="2" class="map-placeholder__title">
        Карта
      </BaseHeading>
      <div class="map-placeholder__area" aria-hidden="true">
        <span class="map-placeholder__hint">
          Карта ({{ mapView.center.lat }}, {{ mapView.center.lon }})
        </span>
      </div>
    </BaseCard>
  </section>
</template>

<style lang="scss" scoped>
.map-placeholder {
  margin-bottom: 1.5rem;

  &__title {
    margin-bottom: 0.75rem;
  }

  &__area {
    aspect-ratio: 16 / 10;
    background: var(--color-map-placeholder, #e8eef4);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }

  &__hint {
    font-size: 0.875rem;
    color: var(--color-text-muted, #8a8a8a);
  }
}
</style>
