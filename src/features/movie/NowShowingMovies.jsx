import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Movie from './Movie'

const NowShowingMovies = () => {
  const movie = {
    title : 'THE BOY AND THE HERON',
    releaseDate : '11 JAN 2024',
    duration : 140,
    language : 'English',
    image : 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/192/2023/10/06110031/zbMRm6P6wPe9SQ6qJ7ZTAvCMS6e-683x1024.jpg',
    genere : [
      {
        id : 1 ,
        name : 'Advanture'
      },
      {
        id : 2 ,
        name : 'Fantasy'
      }
    ]
  }
  return (
    <Container fluid>
      <Row xs={3} md={4} lg={5} className="g-4">
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
    </Container>
  )
}

export default NowShowingMovies