import React from 'react'
import classes from './Home.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import MovieCarousel from '../../components/ui/MovieCarousel'
import MovieSlide from './MovieSlide'

const Home = () => {
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
        <Row xs={1}>
            <MovieCarousel />
        </Row>
        <Row className={classes.card_row}>
            <Col xs='12'>
                <h1>Popular Now</h1>
            </Col>
            <Col className='mt-2'>
                <MovieSlide movie={movie} />
            </Col>
        </Row>
        <Row className={classes.card_row}>
            <Col xs='12'>
                <h1>Now Showing</h1>
            </Col>
            <Col className='mt-2'>
                <MovieSlide movie={movie} />
            </Col>
        </Row>
        <Row className={classes.card_row}>
            <Col xs='12'>
                <h1>Coming Soon</h1>
            </Col>
            <Col className='mt-2'>
                <MovieSlide movie={movie} />
            </Col>
        </Row>
    </Container>
  )
}

export default Home