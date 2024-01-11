import React from 'react'
import classes from './ShowSeatType.module.css'

const ShowSeatType = ({seat}) => {
  return (
    <div className={classes.wapper}>
        <div className={classes.seat_type}>
        <img src="./images/red-seat.png" alt="red-seat" />
            <br />
            {(seat[0]).name} <br />
            {(seat[0]).seatPrice} MMK

        </div>
        <div className={classes.seat_type}>
            <img src="./images/yellow-seat.png" alt="red-seat" />
            <br />
            {(seat[1]).name} <br />
            {(seat[1]).seatPrice} MMK
        </div>
        <div className={classes.seat_type}>
            <img src="./images/twin-seat.png" alt="red-seat" />
            <img src="./images/twin-seat.png" alt="red-seat" />
            <br />
            {(seat[2]).name} <br />
            {(seat[2]).seatPrice} MMK
        </div>
    </div>
  )
}

export default ShowSeatType