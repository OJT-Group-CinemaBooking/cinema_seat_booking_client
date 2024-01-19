import React from 'react'
import classes from './NowShowing.module.css'
import { Card, Col } from 'react-bootstrap'

const NowShowing = ({ name, genre, image }) => {

  return (
    <Col>
        <Card className={classes.nowShowing}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
            <Card.Title className='text-white'>{name}</Card.Title>
            <Card.Text className='text-white'>
                {genre} 
            </Card.Text>
        </Card.Body>
        </Card>
    </Col>
  )
}

export default NowShowing