import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { createPayment } from '../../slice/PaymentSlice'
import { useDispatch } from 'react-redux'
import ReactFlagsSelect from 'react-flags-select'
import classes from './UserPaymentForm.module.css'

const UserPaymentForm = ({ userPayment, handleEdit }) => {
    
  const [ street, setStreet ] = useState(userPayment?.street)
  const [ country, setCountry ] = useState(userPayment?.country)
  const [ city, setCity ] = useState(userPayment?.city)
  const [ zip, setZip ] = useState(userPayment?.zip)
  const [ cardNumber, setCardNumber ] = useState(userPayment?.cardNumber)
  const [ cardType, setCardType ] = useState(userPayment?.cardType)
  const [ expiryMonth, setExpiryMonth ] = useState(userPayment?.expiryMonth)
  const [ expiryYear, setExpiryYear ] = useState(userPayment?.expiryYear)
  const [ cvv, setCVV ] = useState(userPayment?.cvv)
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
      id : userPayment?.id,
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
    handleEdit()
  }
  return (
    <>
    <Form onSubmit={onSubmit}>
    <Card.Body>
        <Card.Text>
        <b>CardNumber:</b>{" "}
        <input 
        type='text' 
        value={cardNumber} 
        className={classes.input}
        onChange={handleCardNumberInputChange}
        required
        />
        </Card.Text>
        <Card.Text>
        <b>Expiry Month:</b> 
        <input 
        type='text' 
        value={expiryMonth} 
        className={classes.input}
        onChange={handleExpiryMonthInputChange}
        required
        /> 
        </Card.Text>
        <Card.Text>
        <b>Expiry Year:</b> 
        <input 
        type='text' 
        value={expiryYear} 
        className={classes.input}
        onChange={handleExpiryYearInputChange}
        required
        />
        </Card.Text>
        <Card.Text>
        <b>CardType:</b> 
        <select 
        value={cardType} 
        onChange={handleCardTypeInputChange} 
        className={classes.input} 
        >
            <option value='VISA'>VISA</option>
            <option value='MASTER'>MASTER</option>
        </select> &nbsp; &nbsp; &nbsp;
        <b>CVV:</b> 
        <input 
        type='text' 
        value={cvv} 
        className={classes.input}
        onChange={handleCVVInputChange}
        required
        />
        </Card.Text>
    </Card.Body>

    <Card.Header>Billing Information</Card.Header>
    <Card.Body>
        <Card.Text>
        <b>Country:</b>
        <ReactFlagsSelect className={classes.selectFlag} 
        selected={country}
        onSelect={(code) => setCountry(code)}
        placeholder="Select Country" 
        searchable 
        searchPlaceholder="Search countries"
        />
         &nbsp; &nbsp; &nbsp;
        <b>City:</b> 
        <input 
        type='text' 
        value={city} 
        className={classes.input}
        onChange={handleCityInputChange}
        required
        />
        </Card.Text>
        <Card.Text>
        <b>Street:</b> 
        <input 
        type='text' 
        value={street} 
        className={classes.input}
        onChange={handleStreetInputChange}
        required
        /> &nbsp; &nbsp; &nbsp;
        <b>ZipCode:</b> 
        <input 
        type='text' 
        value={zip} 
        className={classes.input}
        onChange={handleZipInputChange}
        required
        />
        </Card.Text>
    </Card.Body>
    <div className='text-center my-2'>
        <Button 
        variant='primary' 
        type="submit" 
        disabled={!canCreate}
        >
        Save
        </Button>
    </div>
    </Form>
    </>
  )
}

export default UserPaymentForm