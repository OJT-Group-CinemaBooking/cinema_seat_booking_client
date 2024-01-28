import React, { useState } from 'react'
import classes from './ScheduleForm.module.css'
import { Button, Col, FormControl, Image, Modal, Row } from 'react-bootstrap'
import { ChevronRight, PlusSquareDotted } from 'react-bootstrap-icons'
import MovieScheduleTime from './MovieScheduleTime'
import { IMAGE_URL } from '../../config/baseURL'
import { useDispatch, useSelector } from 'react-redux'
import { createNewShowTime, getShowTimeStatus, setShowTimeStatusToIdle } from '../../../slice/ShowTimeSlice'

const ScheduleForm = ({ cinemaName, theater, showTimeList, movieId, movieTitle }) => {

  const showTimeStatus = useSelector(getShowTimeStatus)

  const [ showDate, setShowDate ] = useState('')
  const [ showTime, setShowTime ] = useState('')
  const [ canRequest, setCanRequest ] = useState(true)

  const dispatch = useDispatch()

  const onDateInputChange = (e) => {setShowDate(e.target.value)}
  const onTimeInputChange = (e) => {setShowTime(e.target.value)}
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if(showTimeStatus.includes('create_')) {
      dispatch(setShowTimeStatusToIdle())
    }
    setShow(true)
  }
  
  const canCreate = [ showDate, showTime, canRequest ].every(Boolean)

  const onSubmit = (event) => {
    event.preventDefault()
    setCanRequest(false)
    if(canCreate) {
      const data = {
      showTime : {
        showDate,
        showTime
      },
      theaterId : theater.id,
      movieId
    }

    dispatch(createNewShowTime(data))
    }

    setShowDate('')
    setShowTime('')
    setCanRequest(true)
  }

  return (
    <>

    <div className={classes.theater}>
      <h5>{theater.name}</h5>
      <div className={classes.theater_body}>
          
        {
          showTimeList.map(st => <MovieScheduleTime key={st.id} showTime={st}/>)
        }
        
        <div 
          className={classes.add_show_time} 
          onClick={handleShow}
        >
          <PlusSquareDotted 
              color='whitesmoke' 
              size={17} 
              className='mx-5' 
          />
        </div>

      </div>
    </div>

    <Modal 
    backdrop="static" 
    centered 
    show={show} 
    onHide={handleClose} 
    animation={true} 
    className={classes.modal}
    >
    <form onSubmit={onSubmit}>
      <Modal.Header closeButton className={classes.modal_header}>
        {
          showTimeStatus === 'create_success' && 
          <span className={`text-info ${classes.info}`}>successifully add new showtime</span>
        }
        {
          showTimeStatus === 'create_failed' && 
          <span className={`text-danger ${classes.info}`}>failed add new showtime.try again.</span>
        }
      </Modal.Header>
          <Modal.Body>
            <Row xs={2} className='d-flex justify-content-evenly'>
              <Col xs='4'>
              <Image src={`${IMAGE_URL}/movie/${movieId}.jpg`} alt='movie' className={classes.movie_poster}/>
              </Col>
              <Col xs='6' className={classes.form_col}>
                <h5>{movieTitle}</h5>
                <div className={classes.toadd_place}>
                  <h6>{cinemaName}</h6>
                  <ChevronRight color='white' size={20}/>
                  <h6>{theater.name}</h6>
                </div>
                <FormControl 
                  type='date' 
                  value={showDate}
                  required 
                  onChange={onDateInputChange}
                />
                <FormControl 
                  type='time' 
                  value={showTime}
                  required 
                  onChange={onTimeInputChange}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className={classes.modal_footer}>
          <Button type='button' variant="secondary" onClick={handleClose}>
              CANCEL
          </Button>
          <Button type='submit' variant="primary" disabled={!canCreate}>
              ADD TIME
          </Button>
          </Modal.Footer>
      </form>
  </Modal>

  </>
  )
}

export default ScheduleForm
