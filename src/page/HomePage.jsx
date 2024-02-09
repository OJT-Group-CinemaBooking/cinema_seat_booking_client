import React, { useEffect } from 'react'
import Home from '../features/movie/Home'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMovie, getAllMovies, getMovieStatus } from '../slice/MovieSlice'
import { Spinner } from 'react-bootstrap'

const HomePage = () => {
  const movieStatus = useSelector(getMovieStatus)

  const allMovie = useSelector(getAllMovies)

  const popularMoiveList = allMovie.filter(movie => movie.popularNow)
  const nowShowingMoiveList = allMovie.filter(movie => movie.nowShowing)
  const comingSoonMoiveList = allMovie.filter(movie => movie.comingSoon)

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
    content = <Home popularMoiveList={popularMoiveList} nowShowingMoiveList={nowShowingMoiveList} comingSoonMoiveList={comingSoonMoiveList} />
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

export default HomePage