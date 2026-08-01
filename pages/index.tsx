import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Movie } from '../types'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    fetch('/api/movies')
      .then((r) => r.json())
      .then(setMovies)
  }, [])

  return (
    <main style={{ padding: 20, fontFamily: 'Inter, sans-serif' }}>
      <h1>Bookingnefilo — Reserva tu entrada</h1>
      <p>Selecciona una película y un horario para reservar tus entradas (1–6).</p>

      <div style={{ display: 'grid', gap: 12 }}>
        {movies.map((m) => (
          <article key={m.id} style={{ border: '1px solid #ddd', padding: 12 }}>
            <h2>{m.title}</h2>
            <p>Duración: {m.duration} min</p>
            <p>Horarios: {m.times.join(' · ')}</p>
            <Link href={`/book/${m.id}`}>
              <a style={{ color: 'white', background: '#0070f3', padding: '8px 12px', borderRadius: 6 }}>Reservar</a>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
