<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)
</script>

<template>
  <div>
    <h1>City: {{ slug }}</h1>
  </div>
</template>

<style lang="scss" scoped>
</style>
