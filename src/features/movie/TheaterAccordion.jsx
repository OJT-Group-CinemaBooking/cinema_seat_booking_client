import React from 'react'
import classes from './TheaterAccordion.module.css'
import { Accordion, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllShowTime } from '../../slice/ShowTimeSlice'
import { useNavigate } from 'react-router-dom'
import { emptySelectedSeats, setBookSeatStatusToIdle } from '../../slice/BookSeatSlice'

const TheaterAccordion = ({ movieId, theater }) => {

  
  const allShowTime = useSelector(getAllShowTime)

  const showTimes = allShowTime.filter(st => 
    st.theater.id === theater.id && (new Date(st.movieTime) >= new Date() ))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const uniqueShowTimeDates = new Set(showTimes.map( st => 
    new Date(st.movieTime).toLocaleDateString()))

  const showTimeDates = [ ...uniqueShowTimeDates ].sort((date1,date2) => (new Date(date1) - new Date(date2)))

  const seatBookingHandler = (showTimeId) => {
    dispatch(emptySelectedSeats())
    dispatch(setBookSeatStatusToIdle())
    navigate(`/user/movie/${movieId}/theater/${theater.id}/show-time/${showTimeId}/seat`)
  }

  return (
    <Col xs='10' sm='8' className='my-2'>
      <Accordion defaultActiveKey={theater.id} className={classes.accordion}>
        <Accordion.Item eventKey={theater.id} className={classes.accordion_item}>
          <Accordion.Header className={classes.accordion_header}>{theater.name}</Accordion.Header>
          <Accordion.Body className={classes.accordion_body}>
            <div className={classes.schedule_scroll}>

              { (showTimeDates.length > 0 )?
                showTimeDates.map( (showDate, index) => 
                <div key={index} className={classes.schedule_item}>
                  <div className={classes.date}>{showDate}</div>
                  {
                    showTimes.filter(st => 
                      new Date(st.movieTime).toLocaleString().includes(showDate)
                      )
                      .sort((st1,st2) => new Date(st1.movieTime) - new Date(st2.movieTime))
                      .map( st => (
                      <div key={st.id} className={classes.time} onClick={() => seatBookingHandler(st.id)}>
                        {new Date(st.movieTime).toLocaleTimeString()}
                      </div>
                    ))
                  }
                </div>
              ) : 
              <div className='text-center'>
                Not Showing Here
              </div>
              }
              
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  )
}

export default TheaterAccordion