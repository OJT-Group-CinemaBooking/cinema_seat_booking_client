import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCinema, getCinemaById, getCinemaStatus, getError } from '../slice/CinemaSlice'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import CinemaDetail from '../features/admin/cinema/CinemaDetail'

const AdminCinemaDetailPage = () => {
  const status = useSelector(getCinemaStatus)
  const error = useSelector(getError)
  const dispatch = useDispatch()

  const { cinemaId } = useParams();
const cinemaIdAsNumber = Number(cinemaId);
  const cinema = useSelector((state) => getCinemaById(state,cinemaIdAsNumber))
  
  useEffect( () => {
    if(status === 'idle'){
      dispatch(fetchAllCinema())
    }
  },[status,dispatch])

  let content = ''

  if(status === 'loading') {
    content = (
        <div className="w-100 mt-5 d-flex justify-content-center">
        <Spinner animation="border" variant="secondary" />
    </div>
    )
  }

  if(status === 'success'){
    content = <CinemaDetail cinema={cinema}/>
    
  }

  if(status === 'fail'){
    content = <p>{error}</p>
  }

  return (
    <article>
      {content}
    </article>
  )
}

export default AdminCinemaDetailPage