import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import classes from './PaymentForm.module.css'
import { CreditCard } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { createPayment } from '../../slice/PaymentSlice'
import ReactFlagsSelect from 'react-flags-select'
import { getAllSelectedSeatList } from '../../slice/BookSeatSlice'
import { getUser } from '../auth/authSlice'

const PaymentForm = () => {

  const selectedSeatList = useSelector(getAllSelectedSeatList)
  const user = useSelector(getUser)
  const currentYear = new Date().getFullYear()

  const [ street, setStreet ] = useState(user.userPayment?.street)
  const [ country, setCountry ] = useState(user.userPayment?.country)
  const [ city, setCity ] = useState(user.userPayment?.city)
  const [ zip, setZip ] = useState(user.userPayment?.zip)
  const [ cardNumber, setCardNumber ] = useState(user.userPayment?.cardNumber)
  const [ cardType, setCardType ] = useState(user.userPayment?.cardType)
  const [ expiryMonth, setExpiryMonth ] = useState(user.userPayment?.expiryMonth)
  const [ expiryYear, setExpiryYear ] = useState(user.userPayment?.expiryYear)
  const [ cvv, setCVV ] = useState(user.userPayment?.cvv)
  const [ canRequest, setCanRequest ] = useState(true)

  const handleStreetInputChange = (e) => {setStreet(e.target.value)}
  const handleCityInputChange = (e) => {setCity(e.target.value)}
  const handleZipInputChange = (e) => {setZip(e.target.value)}
  const handleCardNumberInputChange = (e) => {setCardNumber(e.target.value)}
  const handleCardTypeInputChange = (e) => {setCardType(e.target.value)}
  const handleExpiryMonthInputChange = (e) => {setExpiryMonth(e.target.value)}
  const handleExpiryYearInputChange = (e) => {setExpiryYear(e.target.value)}
  const handleCVVInputChange = (e) => {setCVV(e.target.value)}

  const dispatch = useDispatch()

  const canCreate = [ street, country, city, zip, cardNumber, cardType, expiryMonth, expiryYear, cvv, canRequest ].every(Boolean)

  const onSubmit = (event) => {
    event.preventDefault()
    setCanRequest(false)
    const payment = {
      id : user.userPayment?.id,
      street,
      country,
      city,
      zip,
      cardNumber,
      cardType,
      expiryMonth,
      expiryYear,
      cvv
    }
    
    dispatch(createPayment(payment))
    setCanRequest(true)
  }

  return (
    <Col xs='8' sm='9' className='d-flex justify-content-center'>
      <Form 
        onSubmit={onSubmit}
        className={classes.form}
      >
        <h4>Billing Address</h4>
      <Row className="mb-2">
        <Form.Group as={Col} sm="10" className='mb-2'>
          <Form.Label>Street</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Street" 
            value={street}
            onChange={handleStreetInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Country *</Form.Label>
          <ReactFlagsSelect 
            className={classes.flags_select}
            selected={country}
            onSelect={(code) => setCountry(code)}
            placeholder="Select Country" 
            searchable 
            searchPlaceholder="Search countries"
          />
        </Form.Group>
        <Form.Group as={Col} sm="4">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="City" 
            value={city}
            onChange={handleCityInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} sm="3">
          <Form.Label>Zip</Form.Label>
          <Form.Control 
          type="text" 
          value={zip}
          onChange={handleZipInputChange}
          placeholder="Zip" 
          required />
        </Form.Group>
        
      </Row>
      <h4>Your payment infomation</h4>
      <Row className="mb-2 mt-4">
        <Form.Group as={Col} sm="10">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control 
          type="text" 
          value={cardNumber}
          onChange={handleCardNumberInputChange}
          placeholder="Credit Card Number" 
          required />
        </Form.Group>
      </Row>
      <Row className='mb-4'>

        <Form.Group as={Col} sm="2">
          <Form.Label>CardType</Form.Label>
            <Form.Select 
            aria-label="CradType"
            value={cardType} 
            onChange={handleCardTypeInputChange}
            >
              <option value='VISA'>VISA</option>
              <option value='MASTER'>MASTER</option>
            </Form.Select>
        </Form.Group>

        <Form.Group as={Col} sm="2">
          <Form.Label>Expiry Month</Form.Label>
            <Form.Select 
            aria-label="ExpiryMonth" 
            value={expiryMonth}
            onChange={handleExpiryMonthInputChange}
            >
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            </Form.Select>
        </Form.Group>

        <Form.Group as={Col} sm="2">
          <Form.Label>Expiry Year</Form.Label>
            <Form.Select 
            aria-label="ExpiryYear"
            value={expiryYear}
            onChange={handleExpiryYearInputChange}
            >
              <option value={currentYear}>{currentYear}</option>
              <option value={currentYear + 1}>{currentYear + 1}</option>
              <option value={currentYear + 2}>{currentYear + 2}</option>
              <option value={currentYear + 3}>{currentYear + 3}</option>
              <option value={currentYear + 4}>{currentYear + 4}</option>
            </Form.Select>
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>CVV</Form.Label>
          <InputGroup>
            <Form.Control 
            type="text" 
            value={cvv}
            onChange={handleCVVInputChange}
            placeholder="CVV" 
            required />
            <InputGroup.Text className={classes.creditCard}><CreditCard/></InputGroup.Text>
          </InputGroup>
        </Form.Group>
        
      </Row>
      <Button 
      variant='success' 
      type="submit" 
      disabled={
        (canCreate)? (selectedSeatList.length <= 0) : true
      }
      >
      Checkout Now
      </Button>
      </Form>
    </Col>
  )
}

export default PaymentForm