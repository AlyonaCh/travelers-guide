<template>
  <div>
    <!-- Global navigation -->
    <nav class="nav">
      <ul class="nav-list">
        <li>
          <NuxtLink to="/" class="nav-link" active-class="active">Главная</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/city/barcelona" class="nav-link" active-class="active">Barcelona</NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Page content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Default layout with global navigation
// This layout wraps all pages and provides consistent navigation
</script>

