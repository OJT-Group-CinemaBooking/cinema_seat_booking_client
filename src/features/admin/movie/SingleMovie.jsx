import React, { useState } from 'react'
import { CalendarPlusFill, FileEarmarkXFill, PencilSquare } from 'react-bootstrap-icons'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteMovie } from '../../../slice/MovieSlice'

const SingleMovie = ({ movie }) => {
    const [ showModal, setShowModal ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onUpdate = () => {
        navigate(`/admin/update-movie/${movie.id}`)
    }

    const onDelete = () => {
        setShowModal(true)
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
                <CalendarPlusFill 
                    style={{cursor: 'pointer'}}
                    color='gold' 
                    size={20} 
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