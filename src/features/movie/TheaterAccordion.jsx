import React from 'react'
import classes from './TheaterAccordion.module.css'
import { Accordion, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getShowTimesByTheaterId } from '../../slice/ShowTimeSlice'

const TheaterAccordion = ({ /*movieId,*/ theater }) => {

  
  const showTimes = useSelector((state) => getShowTimesByTheaterId(state,theater.id))

  // const showTime = [
  //   {
  //     id: 1,
  //     date: '2024/1/26',
  //     time: '8:00am'
  //   },
  //   {
  //     id: 2,
  //     date: '2024/1/26',
  //     time: '10:00am'
  //   },
  //   {
  //     id: 3,
  //     date: '2024/1/26',
  //     time: '12:00pm'
  //   },
  //   {
  //     id: 4,
  //     date: '2024/1/26',
  //     time: '3:00pm'
  //   },
  //   {
  //     id: 5,
  //     date: '2024/1/26',
  //     time: '6:00pm'
  //   },
  //   {
  //     id: 6,
  //     date: '2024/1/27',
  //     time: '8:00am'
  //   },
  //   {
  //     id: 7,
  //     date: '2024/1/27',
  //     time: '12:00pm'
  //   },
  //   {
  //     id: 8,
  //     date: '2024/1/27',
  //     time: '5:00pm'
  //   },
  //   {
  //     id: 9,
  //     date: '2024/1/28',
  //     time: '10:00am'
  //   },
  //   {
  //     id: 10,
  //     date: '2024/1/27',
  //     time: '1:00pm'
  //   },
  //   {
  //     id: 11,
  //     date: '2024/1/27',
  //     time: '6:00pm'
  //   },
  //   {
  //     id: 12,
  //     date: '2024/1/27',
  //     time: '8:00pm'
  //   }
  // ]

  // const showTimes = theater.showTime
  // const showTimeList = showTimes.filter( st => st.connectedMovieId === movieId)

  const uniqueShowTimeDates = new Set(showTimes.map( st => st.showDate))

  const showTimeDates = [ ...uniqueShowTimeDates ]

  return (
    <Col xs='10' sm='8' className='my-2'>
      <Accordion defaultActiveKey={theater.id} className={classes.accordion}>
        <Accordion.Item eventKey={theater.id} className={classes.accordion_item}>
          <Accordion.Header>{theater.name}</Accordion.Header>
          <Accordion.Body className={classes.accordion_body}>
            <div className={classes.schedule_scroll}>
              { showTimeDates.map( (showDate, index) => 
                <div key={index} className={classes.schedule_item}>
                  <div className={classes.date}>{showDate}</div>
                  {
                    showTimes.filter(st => st.showDate === showDate).map( st => (
                      <div key={st.id} className={classes.time}>
                        {st.showTime}
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  )
}

export default TheaterAccordion