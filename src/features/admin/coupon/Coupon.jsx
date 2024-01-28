import React, { useEffect, useState } from 'react'
import classes from './Coupon.module.css'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SingleCoupon from './SingleCoupon'
import { createCoupon, getCouponStatus } from '../../../slice/CouponSlice'
import InfoAlert from '../../../components/ui/InfoAlert'

const Coupon = ({ coupon }) => {

    const status = useSelector(getCouponStatus)

  const [couponCode, setCouponCode] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [userCount, setUserCount] = useState('')
  const [discount, setDiscount] = useState('')
  const [canRequest, setCanRequest] = useState(true)
  
  const dispatch = useDispatch()

  const onCouponCodeInputChange = (e) => setCouponCode(e.target.value)
  const onExpiryDateInputChange = (e) => setExpiryDate(e.target.value)
  const onUserCountInputChange = (e) => setUserCount(e.target.value)
  const onDiscountInputChange = (e) => setDiscount(e.target.value)

  const canCreate = [couponCode,expiryDate,canRequest].every(Boolean)

  const onSubmit = (event) =>{
    event.preventDefault()
    if(canCreate) {
      setCanRequest(false)
      const data = {
        coupon : {
            couponCode,
            userCount,
            expiryDate,
            discount,
        }
      }
      dispatch(createCoupon(data))
      setCouponCode('')
      setExpiryDate('')
      setCouponCode('')
      setDiscount('')
      setUserCount('')
      setCanRequest(true)
    }
  }
  
  const [ showAlert, setShowAlert ] = useState(false)

    useEffect(() => {
      if(status === 'create_success' || status === 'create_failed') {
          setShowAlert(true)
      }
    },[status])

  const onHide = () => {
    setShowAlert(false)
  }

  return (
    <Container>
        {
          showAlert && <InfoAlert 
            onHide={onHide}
            variant={(status === 'create_failed')? 'danger' : 'success'}
            information={(status === 'create_failed')?'Create Failed!' : 'Successifully Create!'}
          />
        }
      <Row xs={1} md={2} className="d-flex justify-content-evenly">
        <Col xs="7" className={classes.theater_table}>

          <Row xs={1}>
            <Table className={classes.table}>
              <thead>
                <tr>
                  <th className='text-center'>Coupon Code</th>
                  <th className='text-center'>Expiry Date</th>
                  <th className='text-center'>User Count Left</th>
                  <th className='text-center'>Discount</th>
                </tr>
              </thead>
              <tbody>
                { coupon.map((coupon) => (
                  <SingleCoupon
                  key={coupon.id}
                  coupon={coupon}
                  />
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>

        <Col xs="4" className={classes.form_col}>
          <Form onSubmit={onSubmit} className={classes.form}>
            <h3>NEW Coupon</h3>
            <Form.Group>
              <Form.Label>Coupon Code *</Form.Label>
              <Form.Control
                type="text"
                value={couponCode}
                onChange={onCouponCodeInputChange}
                placeholder="Eg.Cinema2024"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiry Date *</Form.Label>
              <Form.Control
                type="date"
                value={expiryDate}
                onChange={onExpiryDateInputChange}
                placeholder='Expiry Date'
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Discount *</Form.Label>
              <Form.Control
                type="text"
                value={discount}
                onChange={onDiscountInputChange}
                placeholder="2000 (MMK)"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>User Count *</Form.Label>
              <Form.Control
                type="text"
                value={userCount}
                onChange={onUserCountInputChange}
                placeholder="10 (person can use)"
                required
              />
            </Form.Group>
            <div className={classes.button_wapper}>
              <Button type="submit" disabled={!canCreate}>
                ADD
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Coupon