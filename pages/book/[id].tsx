import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BookingForm from '../../components/BookingForm'
import { Movie } from '../../types'

export default function BookPage() {
  const router = useRouter()
  const { id } = router.query
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/movies')
      .then((r) => r.json())
      .then((movies: Movie[]) => {
        const m = movies.find((x) => x.id === String(id)) || null
        setMovie(m)
      })
  }, [id])

  const handleReserve = async (payload: { movieId: string; time: string; quantity: number }) => {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    // Guardar en sessionStorage para mostrar en confirmation
    sessionStorage.setItem('lastReservation', JSON.stringify(data))
    router.push('/confirmation')
  }

  if (!movie) return <p style={{ padding: 20 }}>Cargando película...</p>

  return (
    <main style={{ padding: 20 }}>
      <h1>Reservar — {movie.title}</h1>
      <BookingForm movie={movie} onReserve={handleReserve} />
    </main>
  )
}
