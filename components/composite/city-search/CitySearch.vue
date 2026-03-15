<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseDataListSearch from '~/components/base/base-datalist-search/BaseDataListSearch.vue'
import type { GeocodingResultItem, GeocodingSearchResponse } from './city-search.types'

defineOptions({
  name: 'CitySearch'
})

const emit = defineEmits<{
  navigate: [cityName: string]
}>()

const query = ref('')

const options = ref<GeocodingResultItem[]>([])


const { data, pending, error, execute, status } = useFetch<GeocodingSearchResponse>(
  () => `https://geocoding-api.open-meteo.com/v1/search?name=${query.value}&language=ru`,
  {
    immediate: false,
  }
)
watch(status, (newStatus) => {
  if (newStatus === 'success') {
    options.value.push(...data.value?.results ?? [])
  }
})
function handleUpdate() {
  execute()
}

const cityOptions = computed(
  () => options.value.map(city => city.name) ?? []
)

const canNavigate = computed(() => query.value.trim().length > 0)

function handleNavigate(cityName: string) {
  emit('navigate', cityName)
}
</script>

<template>
  <div class="city-search">
    <BaseDataListSearch
      v-model="query"
      :options="cityOptions"
      label="Город"
      placeholder="Начните вводить город..."
      button-text="Перейти к городу"
      :can-navigate="canNavigate"
      @navigate="handleNavigate"
      id="city-search"
      @update:model-value="handleUpdate"
    />

    <p v-if="pending">Поиск...</p>
    <p v-if="error">Ошибка загрузки</p>
  </div>
</template>

<style lang="scss" scoped>
.city-search {
  max-width: 20rem;
}
</style>
