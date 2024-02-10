import React from 'react'
import classes from './Confirmation.module.css'
import { CheckCircle } from 'react-bootstrap-icons'
import { Col, Container, Row } from 'react-bootstrap'

const Confirmation = ({ ticket }) => {

  return (
    <>
        <h3 className={classes.headder}>Booking Confirmation</h3>
        <Container className={classes.date}>
            <p>{new Date(ticket.createdAt).toDateString()}</p>
        </Container>

        <Container className={classes.success}>
            <h1><CheckCircle className='text-success fs-1'/> <span>Thank you for your purchase!</span></h1>
        </Container>

        <Container className={classes.ticket}>
            <Row className={classes.first_row}>
                <Col className={classes.ticket_details}>
                    <h4>
                        Booking ID : {ticket.id}
                    </h4>
                    <h4 className={classes.movie_name}>
                        {ticket.movieTitle}
                    </h4>
                    <p>{`Cinema : ${ticket.cinema}`}</p>
                    <p>{`Theater : ${ticket.theater}`}</p>


                    <p>STANDARD - 
                        {
                            ticket.boughtSeats.filter(bs => bs.seatType === 'STANDARD').map(bs => <span key={bs.id}>{bs.name}</span>)
                        }
                    </p>
                    <p>PREMIUM - 
                        {
                            ticket.boughtSeats.filter(bs => bs.seatType === 'PREMIUM').map(bs => <span key={bs.id}>{bs.name}</span>)
                        }
                    </p>
                    <p>RECLINER - 
                        {
                            ticket.boughtSeats.filter(bs => bs.seatType === 'RECLINER').map(bs => <span key={bs.id}>{bs.name}</span>)
                        }
                    </p>
                    <p>TWIN - 
                        {
                            ticket.boughtSeats.filter(bs => bs.seatType === 'TWIN').map(bs => <span key={bs.id}>{bs.name}</span>)
                        }
                    </p>
                    <p>VIP - 
                        {
                            ticket.boughtSeats.filter(bs => bs.seatType === 'VIP').map(bs => <span key={bs.id}>{bs.name}</span>)
                        }
                    </p>
                </Col>
                <Col className={classes.date_time}>
                    <p>
                        {new Date(ticket.movieTime).toLocaleDateString()}
                    </p>
                    <p>
                        {new Date(ticket.movieTime).toLocaleTimeString()}
                    </p>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.id}`} alt="QR code" />
                </Col>
            </Row>
            
            <hr className={classes.hr_style}/>

            <Row>
                <Col className={classes.order_summary}>
                    <h4>Order Summary</h4>
                </Col>
            </Row>

            <hr className={classes.hr_style_dotted}/>
           
            
                <Row>
                    <Col className={classes.fee}>
                        <h5>Total Seat Price</h5>
                    </Col>
                    
                    <Col className={classes.fee_price}>
                        <p>{`${ticket.totalPrice} MMK`}</p>
                    </Col>
                </Row>
                <Row className={classes.extra_fee}>
                    <Col className={classes.fee}>
                        <p>Coupon Discount : </p>
                    </Col>
                    
                    <Col className={classes.fee_price}>
                        <p>{`${ticket.actualPrice - ticket.totalPrice} MMK`}</p>
                    </Col>
                </Row>
            
            <hr className={classes.hr_style_dotted}/>
            <Row>
                <Col className={classes.fee}>
                    <h4>Total</h4>
                </Col>
                <Col className={classes.fee_price}>
                    <p>{`${ticket.actualPrice} MMK`}</p>
                </Col>
            </Row>

            <hr className={classes.hr_style}/>

            <Row className={classes.note}>
                <h4>Important Notes:</h4>
            </Row>
            <Row className={classes.note}>
                    <p>Ticket once ordered cannot be exchanged, cancelled or refounded.</p>
                    <p>Children aged 3 years and above will require a separate ticket.</p>
                    <p>The 3D glasses will be available at the cinema for 3D films and must be returned before you exit the premises. 3D Glasses are chargeable (refundable/non-refundable) as per individual cinema policies.</p>
                    <p>Items like laptop, cameras, knifes, lighter, match box, cigarettes, firearms and all types of inflammable objects are strictly prohibited.</p>
                    <p>Items like carrybags eatables, helmets, handbags are not allowed inside the theaters are strictly prohibited. kindly deposit at the baggage counter of mall/cinema.</p>
            </Row>

        </Container>
    </>
  )
}

export default Confirmation