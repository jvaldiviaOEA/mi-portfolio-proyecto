import type { NextApiRequest, NextApiResponse } from 'next'
import { generateMovies } from '../../lib/data'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const movies = generateMovies()
  res.status(200).json(movies)
}
