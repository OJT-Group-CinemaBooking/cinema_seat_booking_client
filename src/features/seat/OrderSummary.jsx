import React, { useEffect, useRef, useState } from 'react'
import classes from './OrderSummary.module.css'
import { ChevronRight, Clock, VolumeUp } from 'react-bootstrap-icons'
import { Accordion, Button, Col, Form } from 'react-bootstrap'
import { IMAGE_URL } from '../config/baseURL'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSelectedSeatList } from '../../slice/BookSeatSlice'
import { getCheckedCoupon, getCouponStatus, setCouponStatusToFetchSuccess, submitCoupon } from '../../slice/CouponSlice'
import InfoModal from '../../components/ui/InfoModal'
import PaymentForm from '../checkout/PaymentForm'
import { createCheckOut, getCheckoutStatus, getCheckoutTicket, setCheckoutStatusToIdle } from '../../slice/CheckOutSlice'
import { useNavigate } from 'react-router-dom'
import { setTicketStatusToIdle } from '../../slice/TicketSlice'
import { getPaymentStatus, setPaymentStatusToIdle } from '../../slice/PaymentSlice'
import { getUser } from '../auth/authSlice'

const OrderSummary = ({ movie, theater, showTime, allCoupon }) => {

  const user = useSelector(getUser)
  const userCouponIds = user.userCupons.map(uc => uc.id)

  const couponStatus = useSelector(getCouponStatus)
  const checkoutStatus = useSelector(getCheckoutStatus)
  const paymentStatus = useSelector(getPaymentStatus)

  const selectedSeatList = useSelector(getAllSelectedSeatList)
  const usedCoupon = useSelector(getCheckedCoupon)
  const checkoutTicket = useSelector(getCheckoutTicket)

  const [ info, setInfo ] = useState('')
  const [ show, setShow ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ confirm, setConfirm ] = useState(false)

  const inputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(checkoutStatus === 'create_success') {
      dispatch(setTicketStatusToIdle())
      navigate(`/user/ticket/${checkoutTicket.id}`,{replace : true})
      dispatch(setCheckoutStatusToIdle())
    }
    if(checkoutStatus === 'create_failed') {
      console.log('failed to create ticket')
    }
    if(paymentStatus === 'create_success'){
      dispatch(createCheckOut({
        boughtSeatList : selectedSeatList,
        showtimeId : showTime.id,
        couponId : ((Object.keys(usedCoupon).length > 0)? usedCoupon.id : 0)
      }))
      dispatch(setPaymentStatusToIdle())
    }
  },[paymentStatus,checkoutStatus,dispatch,checkoutTicket.id,navigate,selectedSeatList,showTime.id,usedCoupon])

  const handleUseCode = () => {
    const couponCode = allCoupon.find(cp => cp.couponCode === inputRef.current.value)
    if(couponCode !== undefined) {
      if(new Date(couponCode.expiryDate) <= new Date()) {
        setInfo('coupon is expired!')
        setShow(true)
        return
      }
      if(couponCode.userCount <= 0) {
        setInfo('coupon is out of limit!')
        setShow(true)
        return
      }
      if(couponCode?.userCoupons.some(uc => userCouponIds.includes(uc.id))) { 
        setInfo('already used!')
        setShow(true)
        return
      }

      dispatch(submitCoupon(couponCode.id))
      setInfo(`you get ${couponCode.discount}MK discount.`)
      setShow(true)
    }else{
      setInfo('wrong coupon!')
      setShow(true)
    }
  }

  const handleClose = () => {
    setShow(false)
    if(couponStatus === 'use_success') {
      setConfirm(true)
      setOpen(false)
    }
    dispatch(setCouponStatusToFetchSuccess())
  }

  const handleAccordion = () => {
    if(open) {
      setOpen(false)
    }else{
      setOpen(true)
    }
  }

  return (
    <>
    <Col xs='4' sm='3' className={classes.summary_container}>
      <InfoModal 
        show={show} 
        information={info} 
        color={couponStatus === 'use_success'? 'success' : 'danger'} 
        handleClose={handleClose} 
      />
      <div className={classes.summary}>
        <div className={classes.wapper}>
          <div className='w-100 d-flex justify-content-evenly'>
            <img 
            src={`${IMAGE_URL}/movie/${movie.id}.jpg`} 
            alt="movie poster" 
            className={classes.poster}
            />
            <div className={classes.movie_details}>
              <h5>{movie.title}</h5>
              <p className={classes.movie_info}>
                <VolumeUp/>
                {movie.language}
              </p>
              <p className={classes.movie_info}>
                <Clock/>
                {
                  (movie.duration > 60)? `${Math.floor(movie.duration / 60)} hr ${movie.duration % 60} mins` :
                  `${movie.duration} mins`
                }
              </p>
            </div>
          </div>
          <div className={classes.show_details}>
            <p className={classes.show_time_place}>
              {theater.cinema.name} Cinema
              <ChevronRight className='mx-1' />
              {theater.name}
            </p>
            <p className={classes.show_details_time}>
              {showTime.showDate}
              <span>
                {showTime.showTime}
              </span>
            </p>
          </div>

          <div className={classes.bookseat_header}>
            <h5>Seat</h5>
            <h5>Price</h5>
          </div>

          {
            selectedSeatList?.map(seat => 
              <div key={seat.name} className={classes.bookseat}>
                <p>{`${seat.name} - ${seat.seatType}`}</p> 
                <p>{`${seat.price} MMK`}</p>
              </div>
            )
          }
          
          <hr className={classes.hr} />

          <div className={classes.total}>
            <h5>Total</h5>
            {
              !confirm && 
              <p>
                {`${selectedSeatList?.reduce((totalprice, seat) => totalprice + seat.price, 0)} MMK`}
              </p>
            }
            {
              confirm && 
              <p>
                <del>
                {selectedSeatList?.reduce((totalprice, seat) => totalprice + seat.price, 0)}
                </del>
                {` ${selectedSeatList?.reduce((totalprice, seat) => totalprice + seat.price, -usedCoupon?.discount)} MMK`}
              </p>
            }
          </div>
          
          <Accordion activeKey={open && '0'} className={classes.accordion}>
            <Accordion.Item className={classes.accordion_item} eventKey="0">
              <Accordion.Header 
              className={classes.accordion_header} 
              onClick={handleAccordion}
              >
                Use cupon code.
              </Accordion.Header>
              <Accordion.Body className={classes.accordion_body}>
              <Form>
                <Form.Control
                  type="text" 
                  className={classes.input}
                  ref={inputRef}
                  placeholder="Cupon code"
                />
                <Button 
                className={classes.use_btn}
                onClick={handleUseCode}
                disabled={confirm}
                >
                  Use Cupon
                </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          
        </div>
      </div>
    </Col>
    <PaymentForm />
    </>
  )
}

export default OrderSummary