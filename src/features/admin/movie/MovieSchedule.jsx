import React, { useEffect, useState } from 'react'
import classes from './MovieSchedule.module.css'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { ArrowLeft, ChevronCompactRight } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import ScheduleForm from './ScheduleForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCinema, getAllCinema, getCinemaStatus } from '../../../slice/CinemaSlice'
import { fetchAllTheater, getAllTheater, getTheaterStatus } from '../../../slice/TheaterSlice'
import { fetchAllShowTimeByMovieId, getAllShowTime, getShowTimeStatus } from '../../../slice/ShowTimeSlice'
import { IMAGE_URL } from '../../config/baseURL'
import { fetchAllMovie, getMovieById, getMovieStatus } from '../../../slice/MovieSlice'

const MovieSchedule = () => {

    const { movieId } = useParams()

    const cinemaStatus = useSelector(getCinemaStatus)
    const theaterStatus = useSelector(getTheaterStatus)
    const showTimeStatus = useSelector(getShowTimeStatus)
    const movieStatus = useSelector(getMovieStatus)

    const cinemaList = useSelector(getAllCinema)
    const theaterList = useSelector(getAllTheater)
    const showTimeList = useSelector(getAllShowTime)
    const movie = useSelector(state => getMovieById(state,movieId))

    const [ selectedCinemaId, setSelectedCinemaId ] = useState(Number(cinemaList[0]?.id)) 
    const [ theatersOfSelcetedCinema, setTheatersOfSelectedCinema ] = useState(theaterList.filter(theater => theater.cinema.id === selectedCinemaId))

    const dispatch = useDispatch()

    useEffect(() => {
        if(cinemaStatus === 'idle') {
            dispatch(fetchAllCinema())
        }
        if(theaterStatus === 'idle') {
            dispatch(fetchAllTheater())
        }
        if(showTimeStatus === 'idle') {
            dispatch(fetchAllShowTimeByMovieId(movieId))
        }
        if(movieStatus === 'idle') {
            dispatch(fetchAllMovie())
        }
    })

    const onSelect = (cinemaId) => {
        setTheatersOfSelectedCinema(theaterList.filter(theater => theater.cinema.id === cinemaId))
        setSelectedCinemaId(cinemaId)
    }


    const navigate = useNavigate()
  return (
    <Container>
        <Row xs={1} className={classes.header}>
            <ArrowLeft 
                color="#D4AF37" 
                size={30} 
                className={classes.back_arrow} 
                onClick={() => navigate('/admin/movie')} 
            />
            <h3 className='text-center text-white'>Schedule( {movie?.title} )</h3>
        </Row>
        <Row xs={2}>
            <Col xs='4' className={classes.cinema_col}>

                {
                    cinemaList.map(cinema => 
                        <div key={cinema.id} 
                        className={`${classes.cinema} ${(selectedCinemaId === cinema.id) && classes.active}`}
                        onClick={() => onSelect(cinema.id)}
                        >
                            <Image 
                                src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`} 
                                className={classes.cinema_image}
                            />
                            <h5>{`${cinema.name} CINEMA`}</h5>
                            <ChevronCompactRight color='whitesmoke' size={25} className={classes.svg} />
                        </div>    
                    )
                }

            </Col>
            <Col xs='8' className={classes.theater_col}>

                {
                    theatersOfSelcetedCinema.map(theater => 
                        <ScheduleForm 
                            key={theater.id} 
                            cinemaName={
                                cinemaList.filter(cinema => cinema.id === selectedCinemaId).map(c => c.name)
                            }
                            theater={theater} 
                            showTimeList={showTimeList.filter(st => st.theater.id === theater.id)} 
                            movieId={movie.id} 
                            movieTitle={movie.title} 
                        />    
                    )
                }

            </Col>
        </Row>
    </Container>
  )
}

export default MovieSchedule