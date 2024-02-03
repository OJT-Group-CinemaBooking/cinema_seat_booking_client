import React, { useEffect } from 'react'
import ShowSeat from '../features/seat/ShowSeat'
import OrderSummary from '../features/seat/OrderSummary'
import { 
  fetchAllSeatPattern, 
  getAllSeatTypePattern, 
  getSeatTypePatternStatus 
} from '../slice/SeatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { fetchAllTheater, getAllTheater, getTheaterStatus } from '../slice/TheaterSlice'
import { fetchAllMovie, getMovieById, getMovieStatus } from '../slice/MovieSlice'
import { fetchAllShowTimeByMovieId, getShowTimeById, getShowTimeStatus } from '../slice/ShowTimeSlice'
import { fetchAllBookSeatByShowTimeId, getBookSeatStatus } from '../slice/BookSeatSlice'
import { useParams } from 'react-router-dom'
import { fetchAllCoupon, getAllCoupon, getCouponStatus } from '../slice/CouponSlice'

const SeatBookingPage = () => {

  const { movieId, theaterId, showTimeId } = useParams()

  const seatPatternStatus = useSelector(getSeatTypePatternStatus)
  const theaterStatus = useSelector(getTheaterStatus)
  const movieStatus = useSelector(getMovieStatus)
  const showTimeStatus = useSelector(getShowTimeStatus)
  const bookSeatStatus = useSelector(getBookSeatStatus)
  const couponStatus = useSelector(getCouponStatus)

  const allSeatTypePattern = useSelector(getAllSeatTypePattern)
  const allTheater = useSelector(getAllTheater)
  const movie = useSelector(state => getMovieById(state,Number(movieId)))
  const showTime = useSelector(state => getShowTimeById(state,Number(showTimeId)))
  const allCoupon = useSelector(getAllCoupon)
  
  const seatPatternList = allSeatTypePattern.filter(sp => sp.theater.id === Number(theaterId)) 
  const theater = allTheater.find(theater => theater.id === Number(theaterId))

  const dispatch = useDispatch()

  useEffect(() => {
    if(seatPatternStatus === 'idle') {
      dispatch(fetchAllSeatPattern())
    }
    if(theaterStatus === 'idle') {
      dispatch(fetchAllTheater())
    }
    if(movieStatus === 'idle') {
      dispatch(fetchAllMovie())
    }
    if(showTimeStatus === 'idle') {
      dispatch(fetchAllShowTimeByMovieId(Number(movieId)))
    }
    if(bookSeatStatus === 'idle') {
      dispatch(fetchAllBookSeatByShowTimeId(Number(showTimeId)))
    }
    if(couponStatus === 'idle') {
      dispatch(fetchAllCoupon())
    }
  })

  let content = ''
  let orderSummary = ''
  if(seatPatternStatus === 'loading' && movieStatus === 'loading' && showTimeStatus === 'loading' && bookSeatStatus === 'loading' && couponStatus === 'loading') {
    content = (
      <div className="w-100 mt-5 d-flex justify-content-center">
        <Spinner animation="border" variant="secondary" />
      </div>
    )
  }
  
  if(seatPatternStatus.includes('_success') && movieStatus === 'fetch_success' && showTimeStatus === 'fetch_success' && bookSeatStatus === 'fetch_success' && couponStatus.includes('_success') ) {
    content = <ShowSeat seatPatternList={seatPatternList} theater={theater}/>
    orderSummary=<OrderSummary movie={movie} theater={theater} showTime={showTime} allCoupon={allCoupon} />
  }

  if(seatPatternStatus === 'fetch_failed') {
    content = <p>Failed! Try again.</p>
  }

  return (
    <Container fluid>
      <Row xs={1} sm={2} className='mt-3'>
        <Col xs='12' sm='9' className='mb-5'>
          {content}
        </Col>
        {orderSummary}
      </Row>
    </Container>
  )
}

export default SeatBookingPage