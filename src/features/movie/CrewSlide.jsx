import React, { useRef } from 'react'
import classes from './CrewSlide.module.css'
import { CaretLeft, CaretRight } from 'react-bootstrap-icons'
import { IMAGE_URL } from '../config/baseURL'

const CrewSlide = ({ movieCrews }) => {
  const scrollRef = useRef()

  const onScrollLeft = () => {
      scrollRef.current.scrollLeft -= 100;
  }

  const onScrollRight = () => {
      scrollRef.current.scrollLeft += 100;
  }
  return (
    <div className={classes.slide_container}>
      <div className={classes.slide_wapper}>
        <div className={classes.slide_btn+' '+classes.slide_btn_left} onClick={onScrollLeft}>
            <CaretLeft/>
        </div>
        <div className={classes.slide_list} ref={scrollRef}>

          {
            movieCrews.map( movieCrew => 
              <div key={movieCrew.id} className={classes.slide_item}>
                <img className={classes.image} src={`${IMAGE_URL}/crew/${movieCrew.crew.id}.jpg`}  alt='person'/>
                <div className={classes.name}>{movieCrew.crew.name}</div>
              </div>
            )
          }

        </div>
        <div className={classes.slide_btn+' '+classes.slide_btn_right} onClick={onScrollRight}>
            <CaretRight/>
        </div>
      </div>
    </div>
  )
}

export default CrewSlide