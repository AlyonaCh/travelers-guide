import type { Weather } from '~/types'
import type { MapView } from '~/types'
import type { TravelIdea } from '~/types'

export interface CityViewData {
  cityName: string
  countryName?: string
  summary: string
  weather: Weather | null
  mapView: MapView
  ideas: TravelIdea[]
}
