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

  useEffect(() => {
    // Opcional: limpiar la última reserva cuando se vuelve al home
    try { sessionStorage.removeItem('lastReservation') } catch (e) { /* ignore */ }
  }, [])

  return (
    <main className="container">
      <h1>Bookingnefilo — Reserva tu entrada</h1>
      <p style={{ color: 'var(--muted)' }}>Selecciona una película y un horario para reservar tus entradas (1–6).</p>

      <div className="movie-grid">
        {movies.map((m) => (
          <article key={m.id} className="movie-card">
            <h2>{m.title}</h2>
            <p>Duración: {m.duration} min</p>
            <p style={{ color: 'var(--muted)' }}>Horarios: {m.times.join(' · ')}</p>
            <div style={{ marginTop: 10 }}>
              <Link href={`/book/${m.id}`}><a className="btn btn-primary">Reservar</a></Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
