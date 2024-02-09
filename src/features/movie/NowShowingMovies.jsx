import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Movie from './Movie'

const NowShowingMovies = ({ nowShowingMoiveList }) => {
  
  return (
    <Container fluid>
      <Row xs={3} md={4} lg={5} className="g-4">
        {
          nowShowingMoiveList.map(movie => 
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
    </Container>
  )
}

export default NowShowingMovies