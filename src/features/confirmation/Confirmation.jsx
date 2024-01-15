import React from 'react'
import classes from './Confirmation.module.css'
import { CheckCircle } from 'react-bootstrap-icons'
import { Container } from 'react-bootstrap'

const Confirmation = () => {
  return (
    <>
        <h3 className={classes.headder}>Booking Confirmation</h3>
        <Container className={classes.date}>
            <p>11/1/2024</p>
        </Container>

        <Container className={classes.success}>
            <h1><CheckCircle className='text-success fs-1'/> <span>Thank you for your purchase!</span></h1>
        </Container>

        <Container className={classes.ticket}>
            <div className={classes.ticket_details}>
                <h4>Migration</h4>
                <p>Mingalar Cinema, Therator - 1</p>
                <p><span>20:00</span> | <span>20/1/2024</span></p>
                <p>Nomal - <span>C3,C4</span></p>
                <p>Premium - <span>F6</span></p>
                <h5>Amount Paid - <span>28000 MMK</span></h5>
            </div>
            <div className={classes.ticket_qr}>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=1" alt="QR code" />
            </div>
        </Container>
    </>
  )
}

export default Confirmation