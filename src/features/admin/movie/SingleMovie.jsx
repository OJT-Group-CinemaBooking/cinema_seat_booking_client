import React, { useState } from 'react'
import { CalendarWeek, FileEarmarkXFill, PencilSquare } from 'react-bootstrap-icons'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMovie, getMovieStatus, setMovieStatusToIdle } from '../../../slice/MovieSlice'
import { setShowTimeStatusToIdle } from '../../../slice/ShowTimeSlice'

const SingleMovie = ({ movie }) => {

    const movieStatus = useSelector(getMovieStatus)

    const [ showModal, setShowModal ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onUpdate = () => {
        if(movieStatus === 'update_success') {
            dispatch(setMovieStatusToIdle())
        }
        navigate(`/admin/movie/${movie.id}/update`)
    }

    const onDelete = () => {
        setShowModal(true)
    }

    const handleSchedule = () => {
        dispatch(setShowTimeStatusToIdle())
        navigate(`/admin/movie/${movie.id}/schedule`)
    }

    const onModalClose = () => {
        setShowModal(false)
    }

    const onConfirm = () => {
        dispatch(deleteMovie(movie.id))
    }
  return (
    <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.releaseDate}</td>
        <td>{(new Date(movie.createdAt)).toLocaleString()}</td>
        <td className={`text-${movie.showing? 'success' : 'secondary'}`}>{movie.showing ? 'SHOWING' : 'SHOW OFF'}</td>
        <td>
            <div className='w-100 d-flex justify-content-evenly'>
                <CalendarWeek 
                    style={{cursor: 'pointer'}}
                    color='rgb(127, 168, 184)' 
                    size={20} 
                    onClick={handleSchedule}
                />
                <PencilSquare 
                    style={{cursor: 'pointer'}}
                    color='blue' 
                    size={20} 
                    onClick={onUpdate}
                />
                <FileEarmarkXFill 
                    style={{cursor: 'pointer'}}
                    color='red' 
                    size={20} 
                    onClick={onDelete}
                />
            </div>{
                    showModal && <ConfirmModal
                        onClose={onModalClose} 
                        onAction={onConfirm} 
                        title='Delete Confirmation' 
                        body={`Delete ${movie.title} ??`}
                    />
                }
        </td>
    </tr>
  )
}

export default SingleMovie