import React from 'react'
import classes from './ShowTimeMovie.module.css'
import { useSelector } from 'react-redux'
import { Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { getAllShowTime, getShowTimeStatus } from '../../slice/ShowTimeSlice'
import { getAllMovies } from '../../slice/MovieSlice'
import { IMAGE_URL } from '../config/baseURL'
import { ClockFill, GlobeCentralSouthAsia, StarFill } from 'react-bootstrap-icons'

const ShowTimeMovie = () => {

    const showTimes = useSelector(getAllShowTime)
    const showTimeStatus = useSelector(getShowTimeStatus)
    const allMovie = useSelector(getAllMovies)
    
    console.log(showTimes)

    const filterMovies = showTimes.map((showtime) => allMovie.filter(m => m.id === showtime.connectMovie))

    const allFilteredMovies = [].concat(...filterMovies);

    const uniqueFilteredMovies = [...new Set(allFilteredMovies)];

    const movie = [...uniqueFilteredMovies];

    let content = ''

    if(showTimeStatus === 'loading') {
        content = (
            <div className="w-100 mt-5 d-flex justify-content-center">
            <Spinner animation="border" variant="secondary" />
        </div>
        )
      }

      if(showTimeStatus === 'fetch_success') {
        content = movie.map((movie) => (
            <div key={movie.id}>
              <Row className={classes.movie_details}>
                <Col className={classes.img} md='2'><Image src={`${IMAGE_URL}/movie/${movie.id}.jpg`}></Image></Col>
                <Col md='8'>
                <h3>{movie.title}</h3>
                <h5> <ClockFill/> {movie.duration} - min</h5>
                <h5> <GlobeCentralSouthAsia/> {movie.language}</h5>
                <h5> <StarFill/> {movie.rating}</h5>
                <h5 className={classes.synopsis}>{movie.synopsis}</h5>
                </Col>
              </Row>
              <div className={classes.schedule_scroll}>
              {[...new Set(showTimes.filter((st) => st.connectMovie === movie.id).map((st) => st.showDate))]
              .map((showDate, index) => (
                <div key={index} className={classes.schedule_item}>
                  <div className={classes.date}>{showDate}</div>
                  {
                    showTimes.filter(st => st.showDate === showDate && st.connectMovie === movie.id).map( st => (
                      <div key={st.id} className={classes.time}>
                        {st.showTime}
                      </div>
                    ))
                  }
                </div>
              ))}
              </div>

            </div>
        ))
      }
        
  return (
    <Container>{content}</Container>
    
  )
  }

export default ShowTimeMovie