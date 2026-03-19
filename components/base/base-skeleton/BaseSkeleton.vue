<script setup lang="ts">
defineOptions({
  name: 'BaseSkeleton',
});
</script>

<template>
  <div class="base-skeleton"/>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.base-skeleton {
  width: var(--custom-sceleton-width, 100%);
  min-height: var(--custom-sceleton-height, 120px);
  border-radius: $border-radius-md;
  background: linear-gradient(
    90deg,
    rgba($color-border-soft, 0.75) 0%,
    rgba($color-border-soft, 0.35) 50%,
    rgba($color-border-soft, 0.75) 100%
  );
  background-size: 240% 100%;
  animation: base-skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes base-skeleton-shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
