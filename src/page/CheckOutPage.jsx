import React from 'react'
import PaymentForm from '../features/checkout/PaymentForm'
import OrderSummary from '../features/checkout/OrderSummary'
import { Container, Row } from 'react-bootstrap'

const CheckOutPage = () => {
  return (
    <Container fluid>
      <Row lg={2} className='d-flex justify-content-center pt-3'>
        <PaymentForm/>
        <OrderSummary/>
      </Row>
    </Container>
  )
}

export default CheckOutPage