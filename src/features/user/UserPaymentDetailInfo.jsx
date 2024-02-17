import React from 'react'
import { Card } from 'react-bootstrap'

const UserPaymentDetailInfo = ({ userPayment, toggle }) => {
    
  return (
    <>
    <Card.Body>
        <Card.Text>
        <b>CardNumber:</b>{" "}
        {toggle ? "xxxx-xxxx-xxxx-xxxx" : userPayment?.cardNumber}
        </Card.Text>
        <Card.Text>
        <b>Expiry Month:</b> {toggle ? "--" : userPayment?.expiryMonth} &nbsp;
        &nbsp; &nbsp;
        <b>Expiry Year:</b> {toggle ? "20xx" : userPayment?.expiryYear}
        </Card.Text>
        <Card.Text>
        <b>CardType:</b> {toggle ? "-" : userPayment?.cardType} &nbsp; &nbsp; &nbsp;
        <b>CVV:</b> {toggle ? "***" : userPayment?.cvv}
        </Card.Text>
    </Card.Body>

    <Card.Header>Billing Information</Card.Header>
    <Card.Body>
        <Card.Text>
        <b>Country:</b> {userPayment?.country} &nbsp; &nbsp; &nbsp;
        <b>City:</b> {userPayment?.city}
        </Card.Text>
        <Card.Text>
        <b>Street:</b> {userPayment?.street} &nbsp; &nbsp; &nbsp;
        <b>ZipCode:</b> {userPayment?.zip}
        </Card.Text>
    </Card.Body>
    </>
  )
}

export default UserPaymentDetailInfo