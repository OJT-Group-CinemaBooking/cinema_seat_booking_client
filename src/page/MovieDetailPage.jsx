import React, { useEffect } from 'react'
import MovieDetail from '../features/movie/MovieDetail'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovie, getMovieById, getMovieStatus } from "../slice/MovieSlice";
import { fetchAllCinema, getAllCinema, getCinemaStatus } from "../slice/CinemaSlice";
import { fetchAllShowTimeByMovieId, getShowTimeStatus } from '../slice/ShowTimeSlice';
import { Spinner } from 'react-bootstrap';
import { fetchAllTheater, getTheaterStatus } from '../slice/TheaterSlice';

const MovieDetailPage = () => {
  
  const { movieId } = useParams()
  const movieStatus = useSelector(getMovieStatus)
  const cinemaStatus = useSelector(getCinemaStatus)
  const showTimeStatus = useSelector(getShowTimeStatus)
  const theaterStatus = useSelector(getTheaterStatus)
  const movie = useSelector((state) => getMovieById(state,movieId))
  const cinemas = useSelector(getAllCinema)

  const dispatch = useDispatch()

  useEffect(() => {
    if(movieStatus === 'idle') {
      dispatch(fetchAllMovie())
    }
    if(cinemaStatus === 'idle') {
      dispatch(fetchAllCinema())
    }
    if(showTimeStatus === 'idle') {
      dispatch(fetchAllShowTimeByMovieId(movieId))
    }
    if(theaterStatus === 'idle') {
      dispatch(fetchAllTheater())
    }
  })

  let content = ''

  if(movieStatus === 'loading' && cinemaStatus === 'loading' && showTimeStatus === 'loading' && theaterStatus === 'loading') {
    content = (
      <div className="w-100 mt-5 d-flex justify-content-center">
        <Spinner animation="border" variant="secondary" />
      </div>
    )
  }

  if(movieStatus.includes('_success') && cinemaStatus.includes('_success') && showTimeStatus.includes('_success') && theaterStatus.includes('_success')) {
    content = <MovieDetail movie={movie} cinemas={cinemas} />
  }

  if(movieStatus === 'fetch_failed' && cinemaStatus === 'fetch_failed' && showTimeStatus === 'fetch_failed' && theaterStatus === 'fetch_failed') {
    content = <p>Failed to Load..!</p>
  }

  return (
    <main>
      {content}
    </main>
  )
}

export default MovieDetailPage