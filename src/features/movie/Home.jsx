import React from 'react'
import classes from './Home.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import MovieCarousel from '../../components/ui/MovieCarousel'
import MovieSlide from './MovieSlide'

const Home = ({ popularMoiveList, nowShowingMoiveList, comingSoonMoiveList }) => {
    
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
                <MovieSlide movieList={popularMoiveList} />
            </Col>
        </Row>
        <Row className={classes.card_row}>
            <Col xs='12'>
                <h1>Now Showing</h1>
            </Col>
            <Col className='mt-2'>
                <MovieSlide movieList={nowShowingMoiveList} />
            </Col>
        </Row>
        <Row className={classes.card_row}>
            <Col xs='12'>
                <h1>Coming Soon</h1>
            </Col>
            <Col className='mt-2'>
                <MovieSlide movieList={comingSoonMoiveList} />
            </Col>
        </Row>
    </Container>
  )
}

export default Home