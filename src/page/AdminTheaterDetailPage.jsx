import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTheater, getTheaterById, getTheaterError, getTheaterStatus } from '../slice/TheaterSlice'
import { Spinner } from 'react-bootstrap'
import TheaterDetail from '../features/admin/Theater/TheaterDetail'
import { useParams } from 'react-router-dom'

const AdminTheaterDetailPage = () => {
    const status = useSelector(getTheaterStatus)
  const error = useSelector(getTheaterError)
  const dispatch = useDispatch()

  const { theaterId } = useParams();
  const {cinemaId} = useParams()
const theaterIdAsNumber = Number(theaterId);
  const theater = useSelector((state) => getTheaterById(state,theaterIdAsNumber))
  
  useEffect( () => {
    if(status === 'idle'){
      dispatch(fetchAllTheater())
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

  if(status.includes('_success')){
    content = <TheaterDetail theater={theater} cinemaId={cinemaId}/>
    
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

export default AdminTheaterDetailPage