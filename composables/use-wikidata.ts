import type { WikipediaSummaryResponse } from './use-wikidata.types'

export function useWikidata(cityName: MaybeRefOrGetter<string>) {
  const name = computed(() => toValue(cityName))
  const encodedName = computed(() => encodeURIComponent(name.value))

  const { data: wikidataSummary } = useAsyncData(
    () => `wikidataSummary-${name.value}`,
    () =>
      $fetch<WikipediaSummaryResponse>(
        `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodedName.value}`
      ),
    { watch: [name] }
  )

  const summary = computed(() => wikidataSummary.value?.extract ?? '')

  return {
    summary,
    wikidataSummary
  }
}
