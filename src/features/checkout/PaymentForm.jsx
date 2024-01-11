import React from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import classes from './PaymentForm.module.css'
import { CreditCard } from 'react-bootstrap-icons'

const PaymentForm = () => {
  return (
    <>
      <Form className={classes.form}>
        <h4>Billing Address</h4>
      <Row className="mb-2">
        <Form.Group as={Col} md="10" className='mb-2'>
          <Form.Label>Street</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Street"
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="City"
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
        <Form.Label>Country</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="Myanmar">Myanmar</option>
            <option value="Thailand">Thailand</option>
            <option value="Singapore">Singapore</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} md="3">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
        </Form.Group>
        
      </Row>
      <h4>Your payment infomation</h4>
      <Row className="mb-2 mt-4">
        <Form.Group as={Col} md="10">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control type="text" placeholder="Credit Card Number" required />
        </Form.Group>
      </Row>
      <Row className='mb-4'>
        <Form.Group as={Col} md="2">
          <Form.Label>Month</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
            </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="2">
          <Form.Label>Year</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>CVV</Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder="CVV" required />
            <InputGroup.Text className={classes.creditCard}><CreditCard/></InputGroup.Text>
          </InputGroup>
        </Form.Group>
        
      </Row>
      <Button variant='success' type="submit">Checkout Now</Button>
    </Form>
    </>
  )
}

export default PaymentForm