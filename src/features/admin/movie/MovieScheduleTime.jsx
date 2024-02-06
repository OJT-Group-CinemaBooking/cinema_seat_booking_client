import React, { useState } from 'react'
import classes from './MovieScheduleTime.module.css'
import { XOctagonFill } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { deleteShowtTime } from '../../../slice/ShowTimeSlice'
import ConfirmModal from '../../../components/ui/ConfirmModal'

const MovieScheduleTime = ({ showTime }) => {

  const movieTime = new Date(showTime.movieTime).toLocaleString()

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

  const timeout = new Date(showTime.movieTime) < new Date()

  return (
    <>
    <div className={`${classes.show_time} ${timeout && classes.time_over}`}>
      {movieTime}
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
      body={`Delete ${movieTime} ??? 
      Ensure that no tickets are purchased for this display.`}
      />
    }
    </>
  )
}

export default MovieScheduleTime