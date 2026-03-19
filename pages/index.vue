<script setup lang="ts">
import CitySearch from '~/components/composite/city-search/CitySearch.vue';
import UIChip from '~/components/base/ui-chip/UIChip.vue';

const popularCities = [
  'Париж',
  'Стамбул',
  'Токио',
  'Барселона',
  'Рим',
  'Бали'
];

function goToCity(cityName: string) {
  navigateTo(`/city/${encodeURIComponent(cityName)}`);
}
</script>

<template>
  <div class="index-page">
    <section class="index-page__hero">
      <p class="index-page__label">Планируйте поездки проще</p>
      <h1 class="index-page__title">Откройте следующий город для идеального путешествия</h1>
      <p class="index-page__description">
        Узнайте главное о городе за минуту: погода, карта и вдохновляющие идеи маршрута в одном месте.
      </p>

      <div class="index-page__search-block">
        <CitySearch class="index-page__search" @navigate="goToCity" />
      </div>

      <div class="index-page__quick-start">
        <p class="index-page__quick-start-title">Быстрый старт:</p>
        <div class="index-page__chips">
          <UIChip
            v-for="city in popularCities"
            :key="city"
            @click="goToCity(city)"
          >
            {{ city }}
          </UIChip>
        </div>
      </div>
    </section>

    <section class="index-page__benefits" aria-label="Преимущества">
      <article class="index-page__benefit-card">
        <h2 class="index-page__benefit-title">Меньше рутины</h2>
        <p class="index-page__benefit-text">Сразу получайте ключевую информацию без долгого поиска по разным сервисам.</p>
      </article>
      <article class="index-page__benefit-card">
        <h2 class="index-page__benefit-title">Больше вдохновения</h2>
        <p class="index-page__benefit-text">Подбирайте идеи для прогулок, выходных и отпуска с учетом текущего города.</p>
      </article>
      <article class="index-page__benefit-card">
        <h2 class="index-page__benefit-title">Быстрый выбор</h2>
        <p class="index-page__benefit-text">Сравнивайте направления и выбирайте следующее место для поездки за пару кликов.</p>
      </article>
    </section>
    <div class="index-page__cta">
      <button class="index-page__cta-button" type="button" @click="goToCity('Стамбул')">
        Начать с популярного направления
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.index-page {
  padding: 2rem 0 3rem;
  color: $color-text-primary;

  &__hero {
    padding: 2rem;
    border-radius: $border-radius-xl;
    background: linear-gradient(145deg, rgba($color-primary, 0.08) 0%, $color-surface 45%, rgba($color-success, 0.12) 100%);
    box-shadow: 0 14px 35px rgba(15, 29, 64, 0.08);
  }

  &__label {
    display: inline-flex;
    margin: 0 0 1rem;
    padding: 0.35rem 0.75rem;
    border-radius: $border-radius-pill;
    background-color: $color-info-soft;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-info-text;
  }

  &__title {
    margin: 0 0 1rem;
    max-width: 820px;
    font-size: clamp(1.85rem, 3.2vw, 2.75rem);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  &__description {
    margin: 0 0 1.75rem;
    max-width: 760px;
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.5;
    color: $color-text-strong;
  }

  &__search-block {
    display: grid;
    grid-gap: $border-radius-lg;
    max-width: 700px;
  }

  &__search {
    margin-bottom: 0;
  }

  &__quick-start {
    margin-top: 1.25rem;
  }

  &__quick-start-title {
    margin: 0 0 0.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: $color-text-subtle;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
  }

  &__benefits {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.25rem;
  }

  &__benefit-card {
    padding: 1.1rem 1rem;
    border-radius: $border-radius-lg;
    background-color: $color-surface;
    box-shadow: 0 6px 20px rgba(10, 24, 52, 0.05);
  }

  &__benefit-title {
    margin: 0 0 0.45rem;
    font-size: 1rem;
    font-weight: 700;
  }

  &__benefit-text {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.45;
    color: $color-text-secondary;
  }

  &__cta {
    margin-top: 1.1rem;
    display: flex;
    justify-content: center;
  }

  &__cta-button {
    padding: 0.85rem 1.25rem;
    border: 0;
    border-radius: $border-radius-md;
    background: linear-gradient(120deg, $color-primary-hover 0%, $color-primary-light 100%);
    font-size: 1rem;
    font-weight: 700;
    color: $color-text-inverse;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 24px rgba(53, 102, 214, 0.32);
    }
  }
}

@media (max-width: 900px) {
  .index-page {
    &__hero {
      padding: 1.5rem;
      border-radius: $border-radius-xl;
    }

    &__benefits {
      grid-template-columns: 1fr;
    }
  }
}
</style>
