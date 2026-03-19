<template>
  <div class="layout-default">
    <nav class="layout-default__nav">
      <ul class="layout-default__nav-list">
        <li class="layout-default__nav-item">
          <NuxtLink to="/" class="layout-default__nav-link" active-class="layout-default__nav-link--active">
            Главная
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <main class="layout-default__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.layout-default {
  min-height: 100vh;
  background: $color-page-bg;

  &__nav {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid $color-border-soft;
    background-color: rgba($color-surface, 0.95);
    backdrop-filter: blur(6px);
  }

  &__nav-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__nav-item {
    display: inline-flex;
  }

  &__nav-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0.45rem 0.9rem;
    border: 1px solid $color-border;
    border-radius: $border-radius-pill;
    background-color: $color-surface;
    color: $color-accent-strong;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      border-color: $color-border-hover;
      background-color: $color-surface-muted;
      transform: scale(1.05);
    }
    &:focus-visible {
      outline: 2px solid $color-primary;
    }

    &--active {
      border-color: $color-primary;
      background-color: $color-primary;
      color: $color-text-inverse;
      pointer-events: none;
    }
  }

  &__main {
    --padding: 16px;
    max-width: $max-width-content;
    margin: auto;
    padding: 0 var(--padding);
    margin: 0 auto;
  }
}
</style>
