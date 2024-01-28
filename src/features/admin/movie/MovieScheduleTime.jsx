import React, { useState } from 'react'
import classes from './MovieScheduleTime.module.css'
import { XOctagonFill } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { deleteShowtTime } from '../../../slice/ShowTimeSlice'
import ConfirmModal from '../../../components/ui/ConfirmModal'

const MovieScheduleTime = ({ showTime }) => {

  const [ showModal, setShowModal ] = useState()

  const dispatch = useDispatch()

  const handleDelete = () => {
    setShowModal(true)
  }

  const onCancel = () => {
    setShowModal(false)
  }

  const onDelete = () => {
    dispatch(deleteShowtTime(showTime.id))
  }

  return (
    <>
    <div className={classes.show_time}>
      {`${new Date(showTime.showDate).toDateString()} ${showTime.showTime}`}
      <XOctagonFill 
       color='rgb(254, 0, 0)' 
       size={17} 
       className='ms-3' 
       onClick={handleDelete}
      />
    </div>
    {
      showModal && 
      <ConfirmModal 
      onClose={onCancel}
      onAction={onDelete}
      title='Delete Confirmation' 
      body={`Delete ${showTime.showDate} ${showTime.showTime} ???`}
      />
    }
    </>
  )
}

export default MovieScheduleTime