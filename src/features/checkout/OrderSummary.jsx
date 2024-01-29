import React, { useEffect, useState } from 'react'
import classes from './OrderSummary.module.css'
import { Clock, VolumeUp } from 'react-bootstrap-icons'
import { Accordion, Button, Form } from 'react-bootstrap'
import InfoAlert from '../../components/ui/InfoAlert'
import { useDispatch, useSelector } from 'react-redux'
import { checkCoupon, getCheckedCoupon, getCouponStatus } from '../../slice/CouponSlice'

const OrderSummary = () => {

  const coupon = useSelector(getCheckedCoupon)
  const status = useSelector(getCouponStatus)

  const [ showAlert, setShowAlert ] = useState(false)
  const [ couponCode, setCouponCode ] = useState('')
  const [ canRequest, setCanRequest ] = useState(true)

  const dispatch = useDispatch()

  const onCouponCodeInputChange = (e) => setCouponCode(e.target.value)

  const canCreate = [couponCode,canRequest].every(Boolean)

  const onCouponSubmit = (event) => {
    event.preventDefault()
    if(canCreate) {
      setCanRequest(false)
      dispatch(checkCoupon(couponCode))
      setCanRequest(true)
      console.log("onsubmit cancreate")
    }
  }

    useEffect(() => {
      if(status === 'check_coupon_success' || status === 'check_coupon_failed') {
          setShowAlert(true)
      }
    },[status])

    let alartColor = 'success'
    let message = 'Successful'
    let discount = 0

    if(status === 'check_coupon_failed'){
      alartColor = 'danger'
      message = 'Worng Coupon Code'
    }
    if(status === 'check_coupon_success'){
        if(coupon.expiryDate < new Date().toISOString().split('T')[0] || coupon.userCount === 0) {
          alartColor = 'danger'
          if(coupon.expiryDate < new Date().toISOString().split('T')[0] ){
            message = 'Expired'
          }
          if(coupon.userCount === 0 ){
            message = 'Out of limit'
          }
        }else{
          discount = coupon.discount
        }
    }

  const onHide = () => {
    setShowAlert(false)
  }

  const totalPrice = 26000
  const actualPrice = totalPrice - discount
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
                   <Form className={classes.cuponForm} onSubmit={onCouponSubmit}>
                   {
                  showAlert && <InfoAlert 
                    onHide={onHide}
                    variant={alartColor}
                    information={message}
                  />
                }
                    <Form.Control
                      type="text"
                      placeholder="Cupon code"
                      value={couponCode}
                      onChange={onCouponCodeInputChange}/>
                    <Button type='submit' variant='primary'>Check cupon code</Button>
                   </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
             
              <p className={classes.totalPrice}>Total - <span>{actualPrice} MMK</span></p>
            </div>
            
         </div>
    </div>
  )
}

export default OrderSummary