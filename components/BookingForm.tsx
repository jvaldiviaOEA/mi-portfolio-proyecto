import React, { useState } from 'react'
import { Movie } from '../types'

type Props = {
  movie: Movie
  onReserve: (payload: { movieId: string; time: string; quantity: number }) => void
}

export default function BookingForm({ movie, onReserve }: Props) {
  const [time, setTime] = useState<string>(movie.times[0] || '')
  const [quantity, setQuantity] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!time) return setError('Selecciona un horario')
    if (quantity < 1 || quantity > 6) return setError('Cantidad debe ser entre 1 y 6')
    onReserve({ movieId: movie.id, time, quantity })
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
      <label>
        Horario
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          {movie.times.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <label>
        Cantidad (1–6)
        <input
          type="number"
          value={quantity}
          min={1}
          max={6}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" style={{ background: '#0070f3', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 6 }}>
        Reservar
      </button>
    </form>
  )
}
