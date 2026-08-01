import { createRequest, createResponse } from 'node-mocks-http'
import moviesHandler from '../pages/api/movies'
import reservationsHandler from '../pages/api/reservations'

describe('API routes', () => {
  test('GET /api/movies returns generated movies', async () => {
    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await moviesHandler(req, res)
    expect(res._getStatusCode()).toBe(200)
    const data = res._getJSONData()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThanOrEqual(3)
  })

  test('POST /api/reservations creates reservation and validates quantity', async () => {
    const moviesReq = createRequest({ method: 'GET' })
    const moviesRes = createResponse()
    await moviesHandler(moviesReq, moviesRes)
    const movies = moviesRes._getJSONData()
    const movie = movies[0]

    const req = createRequest({
      method: 'POST',
      body: { movieId: movie.id, time: movie.times[0], quantity: 2 }
    })
    const res = createResponse()

    await reservationsHandler(req, res)
    expect(res._getStatusCode()).toBe(201)
    const reservation = res._getJSONData()
    expect(reservation.movie.id).toBe(movie.id)
    expect(reservation.quantity).toBe(2)

    // invalid quantity
    const badReq = createRequest({ method: 'POST', body: { movieId: movie.id, time: movie.times[0], quantity: 10 } })
    const badRes = createResponse()
    await reservationsHandler(badReq, badRes)
    expect(badRes._getStatusCode()).toBe(400)
  })
})
