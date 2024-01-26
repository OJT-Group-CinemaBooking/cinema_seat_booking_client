import React, { useEffect, useState } from 'react'
import classes from './MovieShowTime.module.css'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import TheaterAccordion from './TheaterAccordion'
import { fetchTheaterByCinemaId, getAllTheater, getTheaterStatus } from '../../slice/TheaterSlice'
import { IMAGE_URL } from '../config/baseURL'

const MovieShowTime = ({ movieId, cinemas }) => {

  // const cinemas = [
  //   {
  //     id : 1,
  //     name : 'cinema1'
  //   },
  //   {
  //     id : 2,
  //     name : 'cinema2'
  //   },
  //   {
  //     id : 3,
  //     name : 'cinema3'
  //   },
  //   {
  //     id : 4,
  //     name : 'cinema4'
  //   },
  //   {
  //     id : 5,
  //     name : 'cinema5'
  //   },
  //   {
  //     id : 6,
  //     name : 'cinema6'
  //   },
  //   {
  //     id : 7,
  //     name : 'cinema7'
  //   },
  //   {
  //     id : 8,
  //     name : 'cinema8'
  //   },
  //   {
  //     id : 9,
  //     name : 'cinema9'
  //   },
  //   {
  //     id : 10,
  //     name : 'cinema10'
  //   }
  // ]

  // const theaters = [
  //   {
  //     id : 1,
  //     name : 'KyiMal Theater1'
  //   }
  // ]

  const theaterStatus = useSelector(getTheaterStatus)
  const theaters = useSelector(getAllTheater)

  const dispatch = useDispatch()

  const [ selected, setSelected ] = useState(cinemas[0])

  useEffect(() => {
    dispatch(fetchTheaterByCinemaId(selected.id))
  },[dispatch,selected])
  
  const onSelect = (cinema) => {
    setSelected(cinema)
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
                onClick={() => onSelect(cinema)}
              >
                <Image 
                  src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`} 
                  alt='cinema'  
                  className={`${classes.cinema_image} ${selected.name === cinema.name && classes.active}`}
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