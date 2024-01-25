import React, { useRef, useState } from 'react'
import classes from './MovieSlide.module.css'
import Movie from './Movie'
import { Col, Row } from 'react-bootstrap'
import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons'

const MovieSlide = ({ movie }) => {

    const [ showLeft, setShowLeft ] = useState(false)

    const scrollRef = useRef()

    const onScrollLeft = () => {
        scrollRef.current.scrollLeft -= 250;
        if(scrollRef.current.scrollLeft <= 250) {
            setShowLeft(false)
        }
    }
  
    const onScrollRight = () => {
        scrollRef.current.scrollLeft += 250;
        if(scrollRef.current.scrollLeft >= 0) {
            setShowLeft(true)
        }
    }

  return (
    <Row className={classes.card_row}>
        <div className={classes.slide_btn+' '+classes.slide_btn_left} onClick={onScrollLeft}>
            {showLeft && <ArrowLeftShort/>}
        </div>
        <Col className={classes.card_container} ref={scrollRef}>
            <Row className={classes.card_wapper}>
                {Array.from({ length: 7 }).map((_, idx) => (
                <Movie key={idx}
                    title={movie.title} 
                    releaseDate={movie.releaseDate} 
                    duration={movie.duration} 
                    genere={movie.genere} 
                    image={movie.image} 
                    language={movie.language}
                />
                ))}
            </Row>
        </Col>
        <div className={classes.slide_btn+' '+classes.slide_btn_right} onClick={onScrollRight}>
            <ArrowRightShort/>
        </div>
    </Row>
  )
}

export default MovieSlide