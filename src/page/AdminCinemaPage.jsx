import React, { useEffect } from 'react'
import Cinema from '../features/admin/cinema/Cinema'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCinema, getAllCinema, getCinemaStatus, getError } from '../slice/CinemaSlice'
import { Spinner } from 'react-bootstrap'

const AdminNewCinemaPage = () => {
  const AllCinema = useSelector(getAllCinema)
  const status = useSelector(getCinemaStatus)
  const error = useSelector(getError)

  const dispatch = useDispatch()

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchAllCinema())
    }
  },[dispatch,status])

  let content = ''

  if(status === 'success'){
    content = <Cinema allCinema={AllCinema}/>
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

export default AdminNewCinemaPage