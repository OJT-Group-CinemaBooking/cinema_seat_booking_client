import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCrewDetail from '../features/admin/crew/MovieCrewDetail'
import { fetchAllCrew, getCrewById, getCrewStatus } from '../slice/CrewSlice'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const AdminMovieCrewDetailPage = () => {
    const status = useSelector(getCrewStatus)
    const dispatch = useDispatch()
    const { crewId } = useParams()
    const crew = useSelector((state) => getCrewById(state,crewId))

    useEffect( () => {
        if(status === 'idle') {
            dispatch(fetchAllCrew())
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

    if(status.includes('_success')) {
        content = <MovieCrewDetail crew={crew}/>
    }
  return (
    <article>
        {content}
    </article>
  )
}

export default AdminMovieCrewDetailPage