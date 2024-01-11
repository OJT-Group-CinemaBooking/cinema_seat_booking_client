import React from 'react'
import classes from './OrderSummary.module.css'
import { Clock, VolumeUp } from 'react-bootstrap-icons'
import { Accordion, Button, Form } from 'react-bootstrap'

const OrderSummary = () => {
  return (
    <div className={classes.container}>
         <h3>Booking Summary</h3>
         <hr />
         <div className={classes.movie_details}>
            <img src="https://m.media-amazon.com/images/M/MV5BYjQxMWY5NjgtNDI2NS00MWM2LTg2MDAtNjI5NGIwZTNmYWZiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" alt="adventure duck family" />
            <div className={classes.movie_title}>
              <h4>Migration</h4>

              <p className={classes.language}>
                <VolumeUp/>
                ENG
              </p>

            <p className={classes.duration}>
              <Clock/>
              92 Minutes
            </p>
            <p className={classes.cinema}>
              Mingalar Cinema
            </p>
            <p className={classes.cinema}>
              Theater 1
            </p>
            </div>
            <div className={classes.showtime}>
              <h4>Showtime</h4>
              <p>WED 03 JAN <span>20:00</span></p>
              <hr />
              <h4>Seat</h4>
              <p className={classes.seatName}>Nomal - <span>D1,D2,D3</span></p>
              <p>Premium - <span>E3</span></p>

              <Accordion className={classes.accordion}>
                <Accordion.Item className={classes.accordion_item} eventKey="0">
                  <Accordion.Header className={classes.accordion_header}>Have a cupon code?</Accordion.Header>
                  <Accordion.Body className={classes.accordion_body}>
                   <Form className={classes.cuponForm}>
                    <Form.Control  type="text" placeholder="Cupon code"/>
                    <Button variant='primary'>Check cupon code</Button>
                   </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
             
              <p className={classes.totalPrice}>Total - <span>26000 MMK</span></p>
            </div>
            
         </div>
    </div>
  )
}

export default OrderSummary