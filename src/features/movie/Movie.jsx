import React from 'react'
import classes from './Movie.module.css'
import { Card, Col } from 'react-bootstrap'
import { Clock, Mic, PlayCircle, Tags } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setShowTimeStatusToIdle } from '../../slice/ShowTimeSlice'
import { IMAGE_URL } from '../config/baseURL'

const Movie = ({ movieId, title, duration, releaseDate, genere, language }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLookDetail = () => {
    dispatch(setShowTimeStatusToIdle())
    navigate(`/movie/${movieId}/detail`)
  }

  return (
    <Col className='d-flex justify-content-center'>
        <Card className={classes.card}>
            <Card.Img 
            className={classes.card_image} 
            variant="center" 
            src={`${IMAGE_URL}/movie/${movieId}.jpg`} 
            />
            <div className={classes.card_image_hover}>
              <div className={classes.card_play}>
                <PlayCircle onClick={onLookDetail}/><p className={classes.card_play_title}>{title}</p>
              </div>
              <div>
                <ul className={classes.hover_list}>
                  <li><span className={classes.list_icon}><Tags/></span>{genere?.map( (gen) => <span key={gen.id}>{gen.name+'/ '}</span>)}</li>
                  <li><span className={classes.list_icon}><Clock/></span>{duration} mins</li>
                  <li><span className={classes.list_icon}><Mic/></span>{language}</li>
                </ul>
              </div>
              <div className={classes.hover_more_info}>
                <div className={classes.more_info} onClick={onLookDetail}>MORE INFO</div>
              </div>
            </div>
            <Card.Body className={classes.card_body}>
                <p className={classes.release_date}>{releaseDate}</p>
                <Card.Title className={classes.card_title} onClick={onLookDetail}>
                  {(title.length < 25)? title : title.substring(0,26)+'...'}
                </Card.Title>
                <Card.Text className='text-light'>
                    
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default Movie