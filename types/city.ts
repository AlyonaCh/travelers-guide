import type { Location } from './location'
import type { Weather } from './weather'

export interface City {
  id: string
  name: string
  countryCode: string
  location: Location
  population?: number
  weather?: Weather
}
