import React from 'react'
import classes from './ShowTimeMovie.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { getAllShowTime, getShowTimeStatusByTheater } from '../../slice/ShowTimeSlice'
import { getAllMovies } from '../../slice/MovieSlice'
import { IMAGE_URL } from '../config/baseURL'
import { ClockFill, GlobeCentralSouthAsia, StarFill } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { emptySelectedSeats, setBookSeatStatusToIdle } from '../../slice/BookSeatSlice'

const ShowTimeMovie = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showTimes = useSelector(getAllShowTime)
    const showTimeStatus = useSelector(getShowTimeStatusByTheater)
    const { theaterId } = useParams()
    const allMovie = useSelector(getAllMovies)

    const seatBookingHandler = (showTimeId,movieId) => {
      dispatch(emptySelectedSeats())
      dispatch(setBookSeatStatusToIdle())
      navigate(`/movie/${movieId}/theater/${Number(theaterId)}/show-time/${showTimeId}/seat`)
    }

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
              { Array.from(new Set(showTimes
              .filter((st) => st.connectMovie === movie.id)
              .sort((st1,st2) => (new Date(st1.movieTime) - new Date(st2.movieTime)))
              .map((st) => new Date(st.movieTime).toLocaleDateString())))
              .map((showDate, index) => (
                <div key={index} className={classes.schedule_item}>
                  <div className={classes.date}>{showDate}</div>
                  {
                    showTimes
                    .filter(st => 
                      new Date(st.movieTime).toLocaleDateString() === showDate && st.connectMovie === movie.id)
                    .sort((st1,st2) => (new Date(st1.movieTime) - new Date(st2.movieTime)))
                    .map( st => {
                      if (new Date(st.movieTime) >= new Date()) {
                        return <div key={st.id} className={classes.time} onClick={() => seatBookingHandler(st.id,movie.id)}>
                          {new Date(st.movieTime).toLocaleTimeString()}
                        </div>
                      }else {
                        return <div key={st.id} className={classes.time_over}>
                          {new Date(st.movieTime).toLocaleTimeString()}
                        </div>
                      }
                    })
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