<script setup lang="ts">
defineOptions({
  name: 'BaseParagraph'
})
</script>

<template>
  <p class="base-paragraph">
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.base-paragraph {
  margin: 0 0 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary, #4a4a4a);

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
