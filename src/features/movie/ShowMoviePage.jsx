import React, { useState } from 'react'
import classes from './ShowMoviePage.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import NowShowingMovies from './NowShowingMovies'
import ComingSoonMovies from './ComingSoonMovies'

const ShowMoviePage = ({ allMovie }) => {

  const nowShowingMoiveList = allMovie.filter(movie => movie.nowShowing)
  const comingSoonMoiveList = allMovie.filter(movie => movie.comingSoon)

  const [ show, setShow ] = useState('now')
  const onSearchWith = (search) => {
    setShow(search)
  }

  return (
    <Container className='mt-3 px-3' fluid>
        <Row className='d-flex justify-content-center'>
            <Col xs='3' className={`${classes.btn} ${(show === 'now') && classes.active}`} 
              onClick={() => {onSearchWith('now')}}>
              Now Showing
            </Col>
            <Col xs='3' className={`${classes.btn} ${(show === 'soon') && classes.active}`} 
              onClick={() => {onSearchWith('soon')}}>
              Coming Soon
            </Col>
        </Row>
        <Row xs={1} className='mt-4'>
          <Col>
            {(show === 'now') && <NowShowingMovies nowShowingMoiveList={nowShowingMoiveList} />}
            {(show === 'soon') && <ComingSoonMovies comingSoonMoiveList={comingSoonMoiveList} />}
          </Col>
        </Row>
    </Container>
  )
}

export default ShowMoviePage