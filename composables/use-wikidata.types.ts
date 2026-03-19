export interface WikipediaSummaryResponse {
  extract: string
  title: string
  coordinates: {
    lat: number
    lon: number
  }
}
