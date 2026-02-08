<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

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
