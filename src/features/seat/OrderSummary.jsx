import React from 'react'
import classes from './OrderSummary.module.css'
import { Clock, VolumeUp } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'
import { IMAGE_URL } from '../config/baseURL'
import { useSelector } from 'react-redux'
import { getAllSelectedSeatList } from '../../slice/BookSeatSlice'

const OrderSummary = ({ movie, theater, showTime }) => {

  const selectedSeatList = useSelector(getAllSelectedSeatList)
  
  return (
    <div className={classes.summary}>
      <h2 className={classes.header}>Summary</h2>
      <div className={classes.wapper}>
        <img 
        src={`${IMAGE_URL}/movie/${movie.id}.jpg`} 
        alt="movie poster" 
        />
        <div className={classes.movie_details}>
          <h6>{movie.title}</h6>
          
          <p className={classes.language}>
          <VolumeUp/>
            {movie.language}
          </p>

          <p className={classes.duration}>
          <Clock/>
            {
              (movie.duration > 60)? `${Math.floor(movie.duration / 60)} hr ${movie.duration % 60} mins` :
              `${movie.duration} mins`
            }
          </p>
        </div>
        <div className={classes.show_details}>
          <h3 className={classes.show_time}>Show Time</h3>
          <p className={classes.show_time_date}>
            {/* {theater.cinema.name} Cinema */}
            <span>
              {showTime.showDate}
            </span>
          </p>
          <p className={classes.show_details_time}>
            {theater.name}
            <span>
              {showTime.showTime}
            </span>
          </p>
        </div>

        <div className={classes.show_seat}>
          <h5>Seat</h5>
          {
            selectedSeatList?.map(seat => 
              <p key={seat.id}>{`${seat.name} - ${seat.type}`}</p>  
            )
          }
        </div>
        <div className={classes.show_price}>
          <h5>Price</h5>
          {
            selectedSeatList?.map(seat => 
              <p key={seat.id}>{`${seat.price} MMK`}</p>  
            )
          }
        </div>
        <div className={classes.hrline}>
          <hr />
        </div>
        <div className={classes.total}>
         <h5>Total</h5>
         <span>
          {`${selectedSeatList?.reduce((totalprice, seat) => totalprice + seat.price, 0)} MMK`}
         </span>
        </div>
        <div className={classes.btn}>
        <Button>Buy Now</Button>
        </div>
        
      </div>
    </div>
  )
}

export default OrderSummary