import { Movie } from '../types'

export function generateMovies(): Movie[] {
  const base = [
    { id: 'm1', title: 'La Aventura del Código', duration: 120 },
    { id: 'm2', title: 'El Secreto del Teatro', duration: 95 },
    { id: 'm3', title: 'Noche en la Ciudad', duration: 110 }
  ]

  const times = [
    ['14:00', '16:30', '19:00'],
    ['13:45', '17:00', '20:15'],
    ['15:00', '18:30', '21:00']
  ]

  return base.map((m, i) => ({ ...m, times: times[i] }))
}
