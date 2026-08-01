import { render, screen, fireEvent } from '@testing-library/react'
import BookingForm from '../components/BookingForm'

const movie = {
  id: 'm1',
  title: 'Test Movie',
  duration: 100,
  times: ['10:00', '12:00']
}

test('booking form flow calls onReserve with selected values', () => {
  const onReserve = jest.fn()
  render(<BookingForm movie={movie} onReserve={onReserve} />)

  // default quantity 1
  const qtyInput = screen.getByLabelText(/Cantidad/i) as HTMLInputElement
  fireEvent.change(qtyInput, { target: { value: '3' } })

  const select = screen.getByLabelText(/Horario/i) as HTMLSelectElement
  fireEvent.change(select, { target: { value: movie.times[1] } })

  const btn = screen.getByRole('button', { name: /Reservar/i })
  fireEvent.click(btn)

  expect(onReserve).toHaveBeenCalledWith({ movieId: movie.id, time: movie.times[1], quantity: 3 })
})
