export interface GeocodingResult {
  latitude: number
  longitude: number
  name?: string
  country?: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}

export interface OpenMeteoCurrentWeather {
  temperature: number
  weathercode: number
  windspeed: number
  winddirection: number
}

export interface OpenMeteoForecastResponse {
  current_weather?: OpenMeteoCurrentWeather,
  country?: string
}
