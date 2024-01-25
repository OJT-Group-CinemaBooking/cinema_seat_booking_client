import React, { useRef, useState } from 'react'
import classes from './MovieShowTime.module.css'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import MovieTime from './MovieTime'
import { IMAGE_URL } from '../config/baseURL'

const MovieShowTime = ({cinema}) => {
  const days = [
    {
      id: 1,
      name: 'Monday'
    },
    {
      id: 2,
      name: 'Tuesday'
    },
    {
      id: 3,
      name: 'Wednesday'
    },
    {
      id: 4,
      name: 'Thursday'
    },
    {
      id: 5,
      name: 'Friday'
    },
    {
      id: 6,
      name: 'Saturday'
    },
    {
      id: 7,
      name: 'Sunday'
    },
    {
      id: 8,
      name: 'Monday'
    },
    {
      id: 9,
      name: 'Tuesday'
    },
    {
      id: 10,
      name: 'Wednesday'
    },
    {
      id: 11,
      name: 'Thursday'
    },
    {
      id: 12,
      name: 'Friday'
    },
    {
      id: 13,
      name: 'Saturday'
    },
  ]

  const [ date, setDate ] = useState()
    
  const scrollRef = useRef()

  const onScrollLeft = () => {
      scrollRef.current.scrollLeft -= 90;
  }

  const onScrollRight = () => {
      scrollRef.current.scrollLeft += 90;
  }

  const onMonthBtnClick = (name) => {
    setDate(name)
  }
  return (
    <Container>
      <Row xs={2} className={'mb-5 '+classes.cinema_bar}>
        {/* <Col xs='2 offset-1'>
          <div className={classes.outside_slide}>
            <div className={classes.slide_item} >
              Sun <br/> 31
            </div>
          </div>
        </Col> */}
        <Col xs='7'>
          <div className={classes.slide_container}>
            <div className={classes.slide_wapper}>
              <div className={classes.slide_btn+' '+classes.slide_btn_left}>
                  <ChevronLeft onClick={onScrollLeft}/>
              </div>
              <div className={classes.slide_list} ref={scrollRef}>
                {
                  cinema.map(cinema => 
                  <div className={classes.slide_item} 
                    onClick={() => {onMonthBtnClick(cinema.id)}} >
                      <Image src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`} />
                  </div>)
                }
              </div>
              <div className={classes.slide_btn+' '+classes.slide_btn_right}>
                  <ChevronRight onClick={onScrollRight}/>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <MovieTime/>
    </Container>
  )
}

export default MovieShowTime