import React, { useEffect } from 'react'
import ShowMoviePage from '../features/movie/ShowMoviePage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMovie, getAllMovies, getMovieStatus } from '../slice/MovieSlice'
import { Spinner } from 'react-bootstrap'

const MoviePage = () => {
  const movieStatus = useSelector(getMovieStatus)

  const allMovie = useSelector(getAllMovies).filter(movie => movie.showing)

  const dispatch = useDispatch()

  useEffect(() => {
    if(movieStatus === 'idle') {
      dispatch(fetchAllMovie())
    }
  })

  let content = ''
  if(movieStatus === 'loading') {
    content = (
      <div className="w-100 mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" />
      </div>
    )
  }

  if(movieStatus.includes('_success')) {
    content = <ShowMoviePage allMovie={allMovie} />
  }

  if(movieStatus === 'fetch_failed') {
    content = <p>Failed to Load...</p>
  }
  return (
    <section>
      {content}
    </section>
  )
}

export default MoviePage