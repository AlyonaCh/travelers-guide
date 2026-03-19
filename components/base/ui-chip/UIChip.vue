<script setup lang="ts">
defineOptions({
  name: 'UIChip',
});

withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    type: 'button',
  },
);
</script>

<template>
  <button class="ui-chip" :type="type">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.ui-chip {
  padding: 0.55rem 0.9rem;
  border: 1px solid $color-border-chip;
  border-radius: $border-radius-pill;
  background-color: $color-surface;
  font-size: 0.95rem;
  font-weight: 600;
  color: $color-accent;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: $color-border-chip-hover;
    background-color: $color-surface-muted;
    transform: translateY(-1px);
  }
}
</style>
