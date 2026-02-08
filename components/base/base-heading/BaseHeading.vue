<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'BaseHeading'
})

const props = withDefaults(
  defineProps<{
    level?: 1 | 2 | 3 | 4
    tag?: 'h1' | 'h2' | 'h3' | 'h4'
  }>(),
  { level: 2, tag: undefined }
)

const headingTag = computed(() => {
  if (props.tag) return props.tag
  return `h${props.level}` as 'h1' | 'h2' | 'h3' | 'h4'
})
</script>

<template>
  <component :is="headingTag" :class="['base-heading', `base-heading--level-${level}`]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.base-heading {
  margin: 0;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-text, #1a1a1a);

  &--level-1 {
    font-size: 1.75rem;
    letter-spacing: -0.02em;
  }

  &--level-2 {
    font-size: 1.375rem;
    margin-bottom: 0.5rem;
  }

  &--level-3 {
    font-size: 1.125rem;
    margin-bottom: 0.375rem;
  }

  &--level-4 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
}
</style>
