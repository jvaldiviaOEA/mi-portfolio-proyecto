import { useEffect, useState } from 'react'
import { Reservation } from '../types'

export default function Confirmation() {
  const [reservation, setReservation] = useState<Reservation | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('lastReservation')
    if (raw) setReservation(JSON.parse(raw))
  }, [])

  if (!reservation) return <main style={{ padding: 20 }}><p>No hay una reserva reciente. Vuelve a la página principal.</p></main>

  return (
    <main style={{ padding: 20 }}>
      <h1>Reserva confirmada</h1>
      <p><strong>Película:</strong> {reservation.movie.title}</p>
      <p><strong>Horario:</strong> {reservation.time}</p>
      <p><strong>Cantidad de entradas:</strong> {reservation.quantity}</p>
      <p><strong>ID de reserva:</strong> {reservation.id}</p>
    </main>
  )
}
