import React, { useRef } from 'react'
import classes from './MonthlyMovies.module.css'
import { Col, Row } from 'react-bootstrap'
import Movie from './Movie'

const MonthlyMovies = ({ movies, year, month, selected }) => {

    const rowRef = useRef()
    
    if(selected === `${month},${year}`){
      window.scrollTo({top: rowRef.current.offsetTop, behavior: "smooth"})
    }

  return (
    <Row xs={3} md={4} lg={5} className="g-4" ref={rowRef} >
        <Col xs='12' className={classes.title_month}>{`${year} ${month}`}</Col>
        {
          movies.map(movie => 
            <Movie key={movie.id} 
            movieId={movie.id}
            title={movie.title} 
            releaseDate={movie.releaseDate} 
            duration={movie.duration} 
            genere={movie.movieGenere.map(mg => mg.genere)} 
            language={movie.language}
            />  
          )
        }
    </Row>
  )
}

export default MonthlyMovies