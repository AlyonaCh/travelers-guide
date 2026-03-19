<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseDataListSearch from '~/components/base/base-datalist-search/BaseDataListSearch.vue';
import { MOCK_COUNTRIES } from './country-search.const';

defineOptions({
  name: 'CountrySearch',
});

const query = ref('');

const emit = defineEmits<{
  navigate: [countryCode: string];
}>();

const countryOptions = computed(() =>
  MOCK_COUNTRIES.map((c) => c.name),
);

const canNavigate = computed(() => findCountryCode(query.value) !== null);

function findCountryCode(nameOrCode: string): string | null {
  const normalized = nameOrCode.trim().toLowerCase();
  const exact = MOCK_COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === normalized || c.code.toLowerCase() === normalized,
  );
  if (exact) return exact.code;
  const matched = MOCK_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(normalized) ||
      c.code.toLowerCase().includes(normalized),
  );
  const single = matched.length === 1 ? matched[0] : undefined;
  return single ? single.code : null;
}

function handleNavigate(displayValue: string) {
  const code = findCountryCode(displayValue);
  if (code) emit('navigate', code);
}
</script>

<template>
  <div class="country-search">
    <BaseDataListSearch
      v-model="query"
      :options="countryOptions"
      label="Страна"
      placeholder="Начните вводить страну..."
      button-text="Перейти к стране"
      :can-navigate="canNavigate"
      @navigate="handleNavigate"
      id="country-search"
    />
  </div>
</template>

<style lang="scss" scoped>
.country-search {
  max-width: 20rem;
}
</style>
