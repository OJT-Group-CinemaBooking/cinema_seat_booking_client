import React from 'react'
import classes from './ShowSeatType.module.css'

const ShowSeatType = ({ seatType, seatPrice }) => {
  
  let seatimage = ''
  switch (seatType) {
    case 'STANDARD':
      seatimage = `${process.env.PUBLIC_URL}/images/standard-seat.png`
      break;
    case 'PREMIUM':
      seatimage = `${process.env.PUBLIC_URL}/images/premium-seat.png`
      break;
    case 'RECLINER':
      seatimage = `${process.env.PUBLIC_URL}/images/recliner-seat.png`
      break;
    case 'TWIN':
      seatimage = `${process.env.PUBLIC_URL}/images/twin-seat.png`
      break;
    case 'VIP':
      seatimage = `${process.env.PUBLIC_URL}/images/vip-seat.png`
      break;
  
    default:
      seatimage = `${process.env.PUBLIC_URL}/images/standard-seat.png`
      break;
  }
  
  return (
    <div className={classes.seat_type}>
      <img src={seatimage} alt="seat" />
        <br />
        {seatType} <br />
        {seatPrice} MMK 
    </div>
    )
}

export default ShowSeatType