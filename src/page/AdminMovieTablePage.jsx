import React, { useEffect } from 'react'
import MovieTable from '../features/admin/movie/MovieTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMovie, getAllMovies, getMovieStatus } from '../slice/MovieSlice'
import { Spinner } from 'react-bootstrap'

const AdminMovieTablePage = () => {
  const movies = useSelector(getAllMovies)
  const movieStatus = useSelector(getMovieStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    if(movieStatus === 'idle'){
      dispatch(fetchAllMovie())
    }
  },[movieStatus,dispatch])

  let content = ''
  if(movieStatus === 'loading') {
    content = (
      <div className="w-100 mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" />
      </div>
    )
  }
  if(movieStatus === 'fetch_success') {
    content = <MovieTable movies={movies} />
  }
  return (
    <article>
      {content}
    </article>
  )
}

export default AdminMovieTablePage