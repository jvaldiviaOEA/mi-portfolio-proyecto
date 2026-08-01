import type { NextApiRequest, NextApiResponse } from 'next'
import { generateMovies } from '../../lib/data'
import { Reservation } from '../../types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { movieId, time, quantity } = req.body
  if (!movieId || !time || typeof quantity !== 'number') return res.status(400).json({ error: 'Parámetros faltantes' })
  if (quantity < 1 || quantity > 6) return res.status(400).json({ error: 'Cantidad debe estar entre 1 y 6' })

  const movies = generateMovies()
  const movie = movies.find((m) => m.id === String(movieId))
  if (!movie) return res.status(404).json({ error: 'Película no encontrada' })
  if (!movie.times.includes(time)) return res.status(400).json({ error: 'Horario inválido' })

  const reservation: Reservation = {
    id: `res_${Date.now()}`,
    movie,
    time,
    quantity
  }

  // Como no usamos BD, devolvemos la reserva directamente
  res.status(201).json(reservation)
}
