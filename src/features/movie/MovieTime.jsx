import React, { useState } from 'react'
import classes from './MovieTime.module.css'
import { Col, Row } from 'react-bootstrap'
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const MovieTime = () => {
    const navigate = useNavigate()
    const [ up, setUp ] = useState(false)
    const onDownUp = () => {
        if(up){
            setUp(false)
        }else{
            setUp(true)
        }
    }

    const onClickTime = () => {
        navigate('/book-seat')
    }
  return (
    <Row xs={1}>
        <Col xs='7 offset-2' className='mb-2'>
            <div className={classes.show_time_container}>
                <div className={classes.show_cinema}>
                    <p>Galaxy Star</p>
                    <div className={classes.arrow} onClick={onDownUp}>
                        {!up ? <ChevronDown/> : <ChevronUp/>}
                    </div>
                </div>
                <div className={!up && classes.accordion}>
                    <div className={classes.show_theater}>THEATRE I</div>
                    <div className={classes.show_time}>
                        <div className={classes.time} onClick={onClickTime}>8:30AM</div>
                        <div className={classes.time}>11:00AM</div>
                        <div className={classes.time}>2:30PM</div>
                        <div className={classes.time}>6:00PM</div>
                    </div>
                    <hr/>
                </div>
            </div>
        </Col>
    </Row>
  )
}

export default MovieTime