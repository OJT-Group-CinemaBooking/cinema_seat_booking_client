import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTheater, fetchTheaterByCinemaId, getAllTheater, getTheaterError, getTheaterStatus } from '../slice/TheaterSlice'
import Theater from '../features/admin/Theater/Theater'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const AdminTheaterPage = () => {
    const allTheater = useSelector(getAllTheater)
  const status = useSelector(getTheaterStatus)
  const error = useSelector(getTheaterError)

  const dispatch = useDispatch()

  const { cinemaId } = useParams()

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchTheaterByCinemaId(Number(cinemaId)))
    }
  },[dispatch,status])

  let content = ''

  if(status === 'success'){
    content = <Theater theater={allTheater} cinemaId={Number(cinemaId)}/>
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

export default AdminTheaterPage