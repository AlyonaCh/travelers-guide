<script setup lang="ts">
defineOptions({
  name: 'BaseErrorMessage',
});

defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="base-error-message" role="alert">
    {{ message }}
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.base-error-message {
  margin: 0 0 1rem;
  padding: 0.9rem 1rem;
  border: 1px solid $color-border-error;
  border-radius: $border-radius-md;
  background-color: rgba($color-page-bg, 0.7);
  color: $color-text-strong;
  font-size: 0.95rem;
  line-height: 1.35;
}
</style>

