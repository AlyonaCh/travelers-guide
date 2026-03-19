<script setup lang="ts">
defineOptions({
  name: 'BaseCard'
})

withDefaults(
  defineProps<{
    tag?: 'div' | 'section' | 'article'
  }>(),
  { tag: 'div' }
)
</script>

<template>
  <component :is="tag" class="base-card">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.base-card {
  background: var(--color-surface, #fff);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
