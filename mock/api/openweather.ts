import type { Weather } from '~/types'

export const mockOpenWeather = (): Weather => ({
  temp: 22,
  description: 'Переменная облачность',
  icon: '03d'
})
