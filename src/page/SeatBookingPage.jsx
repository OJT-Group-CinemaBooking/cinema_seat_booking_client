import React, { useEffect } from 'react'
import ShowSeat from '../features/seat/ShowSeat'
import OrderSummary from '../features/seat/OrderSummary'
import { 
  fetchAllSeatPattern, 
  getAllSeatTypePattern, 
  getSeatTypePatternStatus 
} from '../slice/SeatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { fetchAllTheater, getAllTheater, getTheaterStatus } from '../slice/TheaterSlice'
import { fetchAllMovie, getMovieById, getMovieStatus } from '../slice/MovieSlice'
import { fetchAllShowTimeByMovieId, getShowTimeById, getShowTimeStatus } from '../slice/ShowTimeSlice'
import { fetchAllBookSeatByShowTimeId, getBookSeatStatus } from '../slice/BookSeatSlice'
import { useParams } from 'react-router-dom'

const SeatBookingPage = () => {

  const { movieId, theaterId, showTimeId } = useParams()

  const seatPatternStatus = useSelector(getSeatTypePatternStatus)
  const theaterStatus = useSelector(getTheaterStatus)
  const movieStatus = useSelector(getMovieStatus)
  const showTimeStatus = useSelector(getShowTimeStatus)
  const bookSeatStatus = useSelector(getBookSeatStatus)

  const allSeatTypePattern = useSelector(getAllSeatTypePattern)
  const allTheater = useSelector(getAllTheater)
  const movie = useSelector(state => getMovieById(state,Number(movieId)))
  const showTime = useSelector(state => getShowTimeById(state,Number(showTimeId)))
  
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
  })

  let content = ''
  let orderSummary = ''
  if(seatPatternStatus === 'loading' && movieStatus === 'loading' && showTimeStatus === 'loading' && bookSeatStatus === 'loading') {
    content = (
      <div className="w-100 mt-5 d-flex justify-content-center">
        <Spinner animation="border" variant="secondary" />
      </div>
    )
  }

  if(seatPatternStatus.includes('_success') && movieStatus === 'fetch_success' && showTimeStatus === 'fetch_success' && bookSeatStatus === ('fetch_success')) {
    content = <ShowSeat seatPatternList={seatPatternList} theater={theater}/>
    orderSummary=<OrderSummary movie={movie} theater={theater} showTime={showTime} />
  }

  if(seatPatternStatus === 'fetch_failed') {
    content = <p>Failed! Try again.</p>
  }

  return (
    <>
   {content}
   {orderSummary}
   </>
  )
}

export default SeatBookingPage