import React from 'react'
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import NowShowing from './NowShowing';
import classes from './NowShowingList.module.css'
import CinemaCarousel from '../../components/ui/CinemaCarousel';

const movies = [
    {
        id:1,
        name:"THE BOY AND THE HERON",
        genre:"Advanture/ Fantasy",
        image:"https://m.media-amazon.com/images/M/MV5BZjZkNThjNTMtOGU0Ni00ZDliLThmNGUtZmMxNWQ3YzAxZTQ1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
    },
    {
        id:2,
        name:"Deadpool 3",
        genre:"Action/Comedy" ,
        image:"https://preview.redd.it/i-made-a-poster-for-deadpool-3-how-excited-are-you-guys-for-v0-kdq6ihhhw5bb1.jpg?width=640&crop=smart&auto=webp&s=89cfc80307de6cf3f24aa18348a245d1a21b2693",
    },
    {
        id:3,
        name:"Furiosa: A Mad Max Saga",
        genre:"Action/Adventure" ,
        image:"https://m.media-amazon.com/images/M/MV5BNjYxZjY3ZDAtNDc1Mi00YzMxLWI4MWEtNzQwZGExYmMzODFhXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id:4,
      name:"Kraven the Hunter",
      genre:" Action/Sci-fi", 
      image:"https://m.media-amazon.com/images/M/MV5BZWNhOWY4OTUtNDIwZC00ZTMzLTgzNDgtZGU5OWM0ODcwYmVlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
    }
]

const NowShowingList = () => {

  const navigate = useNavigate()
  const navigateMovie = () => navigate('/movie')

  return (
    <main>
      <Container className="mt-5" >

        <Row className="text-center mb-4 text-white">
          <h4>NOW SHOWING</h4>
        </Row>

        <Row xs={4} className="g-5 mb-3">
          {movies.map((movie) => (
            <NowShowing
            key={movie.id}
            name={movie.name}
            genre={movie.genre}
            image={movie.image}
            />
          ))}
        </Row>

        <Row>
          <Button variant="outline-secondary" onClick={navigateMovie} style={{width: '150px',margin: 'auto'}} className='text-white' >View More</Button>
        </Row>

        <CinemaCarousel/>
        <Row xs={1} md={1} className='g-5 mt-4 mb-5' style={{background: '#2d63ea'}}>
          <Col className='my-3'>
              <Card className={classes.welcome}>
              <Card.Body>
                  <Card.Title className='my-3'>About the cinema</Card.Title>
                  <Card.Text style={{textAlign: 'justify'}}>
                  With an exclusive private bar & lounge, Kyiml Platinum features boutique cinemas with stylish décor, luxurious fully reclining leather seats (complete with individual tables and footrests!), and personalised in-cinema wait service with a call-button feature.  Platinum customers can choose from the carefully curated menu of small plates and substantial meals, alongside a curated selection of premium wines, craft beers and cocktails.
                  </Card.Text>
              </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default NowShowingList