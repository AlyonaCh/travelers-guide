<script setup lang="ts">
defineOptions({
  name: 'SectionAbout'
})

defineProps<{
  summary: string
}>()
</script>

<template>
  <section class="section-about">
    <BaseCard tag="section">
      <BaseHeading level="2" class="section-about__title">
        О городе
      </BaseHeading>
      <BaseParagraph class="section-about__summary">
        {{ summary }}
      </BaseParagraph>
    </BaseCard>
  </section>
</template>

<style lang="scss" scoped>
.section-about {
  margin-bottom: 1.5rem;

  &__title {
    margin-bottom: 0.75rem;
  }

  &__summary {
    margin-bottom: 0;
  }
}
</style>
