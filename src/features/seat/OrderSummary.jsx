import React from 'react'
import classes from './OrderSummary.module.css'
import { Clock, VolumeUp } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'

const OrderSummary = () => {
  return (
    <div className={classes.summary}>
      <h2 className={classes.header}>Summary</h2>
      <div className={classes.wapper}>
        <img src="https://m.media-amazon.com/images/M/MV5BYjQxMWY5NjgtNDI2NS00MWM2LTg2MDAtNjI5NGIwZTNmYWZiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" alt="adventure duck family" />
        <div className={classes.movie_details}>
          <h3>Migration</h3>
          
          <p className={classes.language}>
          <VolumeUp/>
            ENG
          </p>

          <p className={classes.duration}>
          <Clock/>
            92 Minutes
          </p>
        </div>
        <div className={classes.show_details}>
          <h3 className={classes.show_time}>Show Time</h3>
          <p className={classes.show_time_date}>
            Mingalar Cinema
            <span>
              WED 03 JAN
            </span>
          </p>
          <p className={classes.show_details_time}>
            Theater 1
            <span>
              20:00
            </span>
          </p>
        </div>

        <div className={classes.show_seat}>
          <h5>Seat</h5>
          <p>A1 - Normal</p>
          <p>A2 - Normal</p>
          <p>G1 - premium</p>
        </div>
        <div className={classes.show_price}>
          <h5>Price</h5>
          <p>8000 MMK</p>
          <p>8000 MMK</p>
          <p>12000 MMK</p>
        </div>
        <div className={classes.hrline}>
          <hr />
        </div>
        <div className={classes.total}>
         <h5>Total</h5>  <span>28000 MMK</span>
        </div>
        <div className={classes.btn}>
        <Button>Buy Now</Button>
        </div>
        
      </div>
    </div>
  )
}

export default OrderSummary