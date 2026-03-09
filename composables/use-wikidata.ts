export function useWikidata(cityName: MaybeRefOrGetter<string>) {
  const name = computed(() => toValue(cityName))

  const { data: wikidataSummary, error } = useAsyncData(
    () => `wikidataSummary-${name.value}`,
    () =>
      $fetch<WikipediaSummaryResponse>(`/api/wikidata/${name.value}`),
    { watch: [name] }
  )

  const summary = computed(() => wikidataSummary.value?.extract ?? '')

  watch(error, (newError) => {
    alert(newError)
  })

  return {
    summary,
    wikidataSummary
  }
}
