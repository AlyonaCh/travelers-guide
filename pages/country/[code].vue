<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const code = computed(() => route.params.code as string)
</script>

<template>
  <div>
    <h1>Country: {{ code }}</h1>
  </div>
</template>

<style lang="scss" scoped>
</style>
