import React, { useState } from 'react'
import classes from './MovieShowTime.module.css'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import TheaterAccordion from './TheaterAccordion'
import { getAllTheater, getTheaterStatus } from '../../slice/TheaterSlice'
import { IMAGE_URL } from '../config/baseURL'

const MovieShowTime = ({ movieId, cinemas }) => {

  const theaterStatus = useSelector(getTheaterStatus)
  const theaterList = useSelector(getAllTheater)

  const [ selected, setSelected ] = useState('')
  const [ theaters, setTheaters ] = useState([])
  
  const onSelect = (cinemaId) => {
    setTheaters(theaterList.filter(tr => tr.cinema.id === cinemaId))
    setSelected(cinemaId)
  }

  return (
    <Container fluid>
      <Row xs={1} className='d-flex justify-content-center'>
        <Col xs='12' className='text-center text-light'><h3>Choose Cinema</h3></Col>
        <Col xs='8' className={classes.cinema_column}>
          {
            cinemas.map(cinema => 
              <div key={cinema.id} 
                className={classes.btn} 
                onClick={() => onSelect(cinema.id)}
              >
                <Image 
                  src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`} 
                  alt='cinema'  
                  className={`${classes.cinema_image} ${selected === cinema.id && classes.active}`}
                />  
              </div>
            )
          }
        </Col>
      </Row>
      { theaterStatus === 'loading' && 
        <div className="w-100 mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" />
        </div>
      }
      {theaterStatus.includes('_success') && 
        <Row xs={1} className='d-flex justify-content-center'>
          {
            theaters.map(theater => 
              <TheaterAccordion 
                key={theater.id} 
                movieId={movieId}
                theater={theater} 
              />
              )
          }
        </Row>
      }
      {theaterStatus === 'fetch_failed' && <p>Failed to Load.SomeThings Wrong!</p>}
    </Container>
  )
}

export default MovieShowTime