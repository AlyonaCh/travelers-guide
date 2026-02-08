<script setup lang="ts">
import type { TravelIdea } from '~/types'

defineOptions({
  name: 'IdeasList'
})

defineProps<{
  ideas: TravelIdea[]
}>()
</script>

<template>
  <section class="ideas-list">
    <BaseCard tag="section">
      <BaseHeading level="2" class="ideas-list__title">
        Идеи для путешествия
      </BaseHeading>
      <ul class="ideas-list__list">
        <li
          v-for="idea in ideas"
          :key="idea.id"
          class="ideas-list__item"
        >
          <h3 class="ideas-list__item-title">
            {{ idea.title }}
          </h3>
          <p class="ideas-list__item-description">
            {{ idea.description }}
          </p>
        </li>
      </ul>
    </BaseCard>
  </section>
</template>

<style lang="scss" scoped>
.ideas-list {
  margin-bottom: 1.5rem;

  &__title {
    margin-bottom: 1rem;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__item {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-border, #eaeaea);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  &__item-title {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text, #1a1a1a);
  }

  &__item-description {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #4a4a4a);
  }
}
</style>
