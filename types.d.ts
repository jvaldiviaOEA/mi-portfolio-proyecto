export type Movie = {
  id: string
  title: string
  duration: number
  times: string[]
}

export type Reservation = {
  id: string
  movie: Movie
  time: string
  quantity: number
}
