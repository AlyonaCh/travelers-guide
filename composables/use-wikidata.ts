const defaultCoordinates = {
  lat: 0,
  lon: 0
}

export function useWikidata(cityName: MaybeRefOrGetter<string>) {
  const name = computed(() => toValue(cityName))
  const config = useRuntimeConfig()
  const isPagesEnv = computed(() => config.public.deployEnv === 'pages')

  const requestUrl = computed(() => {
    const encodedCity = encodeURIComponent(name.value)

    if (isPagesEnv.value) {
      return `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodedCity}`
    }

    return `/api/wikidata/${encodedCity}`
  })

  const { data: wikidataSummary, error, pending } = useAsyncData(
    () => `wikidataSummary-${name.value}`,
    () => $fetch<WikipediaSummaryResponse>(requestUrl.value),
    { watch: [name, requestUrl], server: !isPagesEnv.value }
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
