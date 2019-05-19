export const cleanMovies = (movies) => movies.map(movie => {
  const { id, backdrop_path, title, poster_path, release_date, vote_average, overview } = movie
  // Added backdrop path for single api call(gj pages friendly)
  return {
    movie_id: id,
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
    backdrop_path
  }
})
