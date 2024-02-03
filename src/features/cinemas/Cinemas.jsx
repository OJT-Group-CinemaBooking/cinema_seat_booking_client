import React from 'react'
import classes from './Cinemas.module.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { IMAGE_URL } from '../config/baseURL';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllShowTimeByTheaterId } from '../../slice/ShowTimeSlice';

const Cinemas = ({ allCinema,alltheater }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onNavigate = (theaterId) => {
        dispatch(fetchAllShowTimeByTheaterId(theaterId))
        navigate(`/show-movie/${theaterId}`)
    }
        
  return (
    <Container>
        { allCinema.map((cinema) => 
            <div key={cinema.id} className={classes.wapper}>
                <Row className={classes.cinema}>
                    <Col md='6' className={classes.cinema_img}>
                    <img src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`} alt="cinema" />
                    </Col>
                    <Col md='4'>
                    <h2>{cinema.name}</h2>
                    <h5>{cinema.location}</h5>
                    </Col>
                </Row>
                {
                    alltheater.filter(tr => tr.cinema.id === cinema.id).map((theater) => 
                    <div key={theater.id} className={classes.theater}>
                        <div>
                            {theater.name}
                        </div>
                        <div>
                            {theater.screen}
                        </div>
                        <Button variant="primary" onClick={ () => onNavigate(theater.id) }>See What's Playing</Button>
                    </div>
                    )
                }
            
            </div>
            
        ) }
    </Container>
    
  )
}

export default Cinemas