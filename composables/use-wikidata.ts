const defaultCoordinates = {
  lat: 0,
  lon: 0
}

export function useWikidata(cityName: MaybeRefOrGetter<string>) {
  const name = computed(() => toValue(cityName))

  const { data: wikidataSummary, error, pending } = useAsyncData(
    () => `wikidataSummary-${name.value}`,
    () => $fetch<WikipediaSummaryResponse>(`/api/wikidata/${name.value}`),
    { watch: [name] }
  )

  const summary = computed(() => wikidataSummary.value?.extract ?? '')

  const coordinates = computed(() => wikidataSummary.value?.coordinates ?? defaultCoordinates)

  return {
    summary,
    coordinates,
    wikidataSummary,
    isLoading: pending,
    error
  }
}
