import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTheater, getAllTheater, getTheaterError, getTheaterStatus } from '../slice/TheaterSlice'
import Theater from '../features/admin/Theater/Theater'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchAllCinema, getCinemaStatus } from '../slice/CinemaSlice'

const AdminTheaterPage = () => {

  const { cinemaId } = useParams()

  const theaterStatus = useSelector(getTheaterStatus)
  const cinemaStatus = useSelector(getCinemaStatus)
  const error = useSelector(getTheaterError)

  const allTheater = useSelector(getAllTheater)
  const theaterList = allTheater.filter(theater => theater.cinema.id === Number(cinemaId))
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(theaterStatus === 'idle') {
      dispatch(fetchAllTheater())
    }
    if(cinemaStatus === 'idle') {
      dispatch(fetchAllCinema())
    }
  },[dispatch,theaterStatus,cinemaStatus])

  let content = ''

  if(theaterStatus.includes('_success')){
    content = <Theater cinemaId={cinemaId} theaterList={theaterList} />
  }

  if(theaterStatus === 'loading'){
    content = (
    <div className="w-100 mt-5 d-flex justify-content-center">
      <Spinner animation="border" variant="secondary" />
    </div>
    )
  }

  if(theaterStatus === 'fetch_fail') {
    content = <p>{error}</p>
  }

  return (
    <article>
      {content}
    </article>
  )
}

export default AdminTheaterPage