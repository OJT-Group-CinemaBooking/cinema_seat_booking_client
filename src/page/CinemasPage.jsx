import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCinema, getAllCinema, getCinemaStatus, getError } from '../slice/CinemaSlice'
import Cinemas from '../features/cinemas/Cinemas'
import { fetchAllTheater, getAllTheater } from '../slice/TheaterSlice'
import { fetchAllMovie } from '../slice/MovieSlice'

const CinemasPage = () => {
  const allCinema = useSelector(getAllCinema)
  const allTheater = useSelector(getAllTheater)
  const status = useSelector(getCinemaStatus)
  const error = useSelector(getError)

  const dispatch = useDispatch()

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchAllCinema())
      dispatch(fetchAllTheater())
      dispatch(fetchAllMovie())
    }
  },[dispatch,status])

  let content = ''

  if(status.includes('_success')){
    content = <Cinemas allCinema={allCinema} alltheater={allTheater}/>
  }

  if(status === 'loading'){
    content = (
    <div className="w-100 mt-5 d-flex justify-content-center">
      <Spinner animation="border" variant="secondary" />
    </div>
    )
  }

  if(status === 'fetch_fail') {
    content = <p>{error}</p>
  }

  return (
    <article>
      {content}
    </article>
    
  )

}

export default CinemasPage