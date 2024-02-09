import React from 'react'
import classes from './MovieInformation.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import CrewSlide from './CrewSlide'
import HTMLReactParser from 'html-react-parser'

const MovieInformation = ({ movieCrew, synopsis ,trailer}) => {

  const starrings = movieCrew.filter(mc => mc.crew.role === 'Starring')
  const directors = movieCrew.filter(mc => mc.crew.role === 'Director')

  const html = trailer
  const element = HTMLReactParser(html)
  return (
    <Container>
        <Row className={classes.synopsis_group}>
            <Col xs='10 offset-1' className={classes.synopsis}>
            <p className={classes.synopsis_title}>Synopsis</p>
              {synopsis}
            </Col>
        </Row>
        <Row>
          <div className={classes.trailer}>
            {element}
          </div>
        </Row>
        <Row>
            <Col  xs='10 offset-1' >
            <p className={classes.synopsis_title}>Starrings</p>
            <CrewSlide movieCrews={starrings} />
            </Col>
        </Row>
        <Row>
            <Col  xs='10 offset-1' >
            <p className={classes.synopsis_title}>Directors</p>
            <CrewSlide movieCrews={directors} />
            </Col>
        </Row>
    </Container>
  )
}

export default MovieInformation