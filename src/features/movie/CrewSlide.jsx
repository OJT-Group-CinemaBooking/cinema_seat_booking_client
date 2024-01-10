import React, { useRef } from 'react'
import classes from './CrewSlide.module.css'
import { CaretLeft, CaretRight } from 'react-bootstrap-icons'

const CrewSlide = () => {
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
            <div className={classes.slide_item}>
              <img className={classes.image} src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg'  alt='person'/>
              <div className={classes.name}>KO SHIBASAKI</div>
            </div>

            <div className={classes.slide_item}>
              <img className={classes.image} src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg'  alt='person'/>
              <div className={classes.name}>KO SHIBASAKI</div>
            </div>

            <div className={classes.slide_item}>
              <img className={classes.image} src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg'  alt='person'/>
              <div className={classes.name}>KO SHIBASAKI</div>
            </div>

            <div className={classes.slide_item}>
              <img className={classes.image} src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg'  alt='person'/>
              <div className={classes.name}>KO SHIBASAKI</div>
            </div>

            <div className={classes.slide_item}>
              <img className={classes.image} src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg'  alt='person'/>
              <div className={classes.name}>KO SHIBASAKI</div>
            </div>

            <div className={classes.slide_item}>
              <img className={classes.image} src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg'  alt='person'/>
              <div className={classes.name}>KO SHIBASAKI</div>
            </div>

            <div className={classes.slide_item}>
              <img className={classes.image} src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg'  alt='person'/>
              <div className={classes.name}>KO SHIBASAKI</div>
            </div>
        </div>
        <div className={classes.slide_btn+' '+classes.slide_btn_right} onClick={onScrollRight}>
            <CaretRight/>
        </div>
      </div>
    </div>
  )
}

export default CrewSlide