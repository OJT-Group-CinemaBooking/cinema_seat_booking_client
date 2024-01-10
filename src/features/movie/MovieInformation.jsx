import React from 'react'
import classes from './MovieInformation.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import CrewSlide from './CrewSlide'

const MovieInformation = () => {
  return (
    <Container>
        <Row className={classes.synopsis_group}>
            <Col xs='10 offset-1' className={classes.synopsis}>
            <p className={classes.synopsis_title}>Synopsis</p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis delectus placeat vero a laboriosam aut maiores amet eius, voluptates nesciunt odio error cum, nemo earum ad quisquam, exercitationem quas iste.
            </Col>
        </Row>
        <Row>
            <Col  xs='10 offset-1' >
            <p className={classes.synopsis_title}>Starrings</p>
            <CrewSlide/>
            </Col>
        </Row>
        <Row>
            <Col  xs='10 offset-1' >
            <p className={classes.synopsis_title}>Directors</p>
            <CrewSlide/>
            </Col>
        </Row>
    </Container>
  )
}

export default MovieInformation