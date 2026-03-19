import type { City } from './city'

export interface Country {
  code: string
  name: string
  capital?: City
}
