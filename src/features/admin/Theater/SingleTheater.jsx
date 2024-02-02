import React, { useState } from 'react'
import { Diagram3Fill, FileEarmarkXFill, PencilSquare } from 'react-bootstrap-icons'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTheater, getTheaterStatus, setTheaterStatusToIdle } from '../../../slice/TheaterSlice'

const SingleTheater = ({ theater, cinemaId }) => {

    const status = useSelector(getTheaterStatus)

    const [ showModal, setShowModal ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onDelete = () => {
    setShowModal(true)
    }

    const onCancel = () => {
    setShowModal(false)
    }

    const onConfirm = () => {
    dispatch(deleteTheater(theater.id))
    }

    const onNavigateDetail = () => {
    if(status === 'update_success') {
        dispatch(setTheaterStatusToIdle())
    }
    navigate(`/admin/cinema/${cinemaId}/theater/${theater.id}/update`)
    }

    const onNavigateSeatTypePattern = () => {
    navigate(`/admin/cinema/${cinemaId}/theater/${theater.id}/seat-pattern`)
    }
  return (
    <tr key={theater.id}>
        <td>{theater.name}</td>
        <td>{theater.screen}</td>
        <td className='d-flex justify-content-center'>
            <Diagram3Fill color='#FF9800' onClick={onNavigateSeatTypePattern} />
        </td>
        <td>
            <div className="d-flex justify-content-evenly pt-2">
            <PencilSquare color="#0079FF" onClick={onNavigateDetail}/>
            <FileEarmarkXFill color="red"  onClick={onDelete}/>
            </div>
        </td>{
            showModal && <ConfirmModal
            onClose={onCancel}
            onAction={onConfirm}
            title='Delete Confirmation'
            body={`Delete ${theater.name} ??`}
            />
        }
        </tr>
  )
}

export default SingleTheater