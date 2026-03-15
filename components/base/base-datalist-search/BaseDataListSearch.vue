<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'BaseDataListSearch',
});

const props = withDefaults(
  defineProps<{
    options: string[];
    modelValue: string;
    label: string;
    placeholder: string;
    buttonText: string;
    canNavigate?: boolean;
    id: string;
  }>(),
  { canNavigate: undefined },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  navigate: [value: string];
}>();

const inputId = `base-datalist-search-input-${props.id}`;
const listId = `base-datalist-search-list-${props.id}`;

const isNavigateAllowed = computed(() => {
  if (props.canNavigate !== undefined) return props.canNavigate;
  return props.modelValue.trim().length > 0;
});

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const isEnoughLength = target.value.trim().length > 3;
  if (isEnoughLength) {
    emit('update:modelValue', target.value);
  }
}

function submit() {
  const value = props.modelValue.trim();
  if (value && isNavigateAllowed.value) emit('navigate', value);
}
</script>

<template>
  <div class="base-datalist-search">
    <label class="base-datalist-search__label" :for="inputId">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :value="modelValue"
      type="text"
      :list="listId"
      class="base-datalist-search__input"
      :placeholder="placeholder"
      autocomplete="off"
      @input="onInput"
      @keydown.enter="submit"
    />
    <datalist
      :id="listId"
      class="base-datalist-search__datalist"
      :key="options.length"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      ></option>
    </datalist>
    <button
      type="button"
      class="base-datalist-search__button"
      :disabled="!isNavigateAllowed"
      @click="submit"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.base-datalist-search {
  max-width: 20rem;

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary, #6b6b6b);
  }

  &__input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid var(--color-border, #ccc);
    border-radius: 0.25rem;
    background: #fff;

    &::placeholder {
      color: var(--color-text-muted, #999);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary, #333);
    }
  }

  &__button {
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #fff;
    background: var(--color-primary, #333);
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
